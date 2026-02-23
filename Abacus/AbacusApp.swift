//
//  AbacusApp.swift
//  Abacus
//
//  Created by Devaraj N Subramanian on 23/02/26.
//

import SwiftUI
import CoreData

@main
struct AbacusApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            MainTabView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
struct MainTabView: View {
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    @StateObject private var progressTracker = ProgressTracker()
    @State private var selectedView: NavigationItem? = .practice
    
    var body: some View {
        if horizontalSizeClass == .regular {
            // iPad layout with sidebar
            NavigationSplitView {
                // Sidebar with navigation and calendar
                List(selection: $selectedView) {
                    Section("Navigation") {
                        ForEach(NavigationItem.mainNavigation, id: \.id) { item in
                            NavigationLink(value: item) {
                                Label(item.title, systemImage: item.icon)
                            }
                        }
                    }
                    
                    Section("Progress") {
                        NavigationLink(value: NavigationItem.calendar) {
                            Label("Calendar", systemImage: "calendar")
                        }
                    }
                }
                .navigationTitle("Abacus")
            } detail: {
                // Main content area
                selectedViewContent
            }
        } else {
            // iPhone layout with TabView
            TabView {
                ContentView()
                    .tabItem {
                        Label(AbacusContent.Navigation.practice, systemImage: "circle.grid.3x3.fill")
                    }
                
                GameView()
                    .tabItem {
                        Label(AbacusContent.Navigation.game, systemImage: "gamecontroller.fill")
                    }
                
                LearningView()
                    .tabItem {
                        Label(AbacusContent.Navigation.learn, systemImage: "book.fill")
                    }
            }
        }
    }
    
    @ViewBuilder
    private var selectedViewContent: some View {
        switch selectedView {
        case .practice:
            ContentView()
        case .game:
            GameViewiPad(progressTracker: progressTracker)
        case .learn:
            LearningView()
        case .calendar:
            CalendarView(progressTracker: progressTracker)
        case .none:
            ContentView()
        }
    }
}

enum NavigationItem: String, Identifiable {
    case practice = "Practice"
    case game = "Game"
    case learn = "Learn"
    case calendar = "Calendar"
    
    var id: String { rawValue }
    
    static var mainNavigation: [NavigationItem] {
        [.practice, .game, .learn]
    }
    
    var title: String {
        switch self {
        case .practice:
            return AbacusContent.Navigation.practice
        case .game:
            return AbacusContent.Navigation.game
        case .learn:
            return AbacusContent.Navigation.learn
        case .calendar:
            return "Calendar"
        }
    }
    
    var icon: String {
        switch self {
        case .practice:
            return "circle.grid.3x3.fill"
        case .game:
            return "gamecontroller.fill"
        case .learn:
            return "book.fill"
        case .calendar:
            return "calendar"
        }
    }
}

struct LearningView: View {
    var body: some View {
        NavigationView {
            List {
                ForEach(Array(AbacusContent.Learning.tutorialList.enumerated()), id: \.offset) { index, tutorial in
                    NavigationLink(destination: TutorialDetailView(tutorial: tutorial)) {
                        VStack(alignment: .leading, spacing: 5) {
                            Text(tutorial.title)
                                .font(.headline)
                            Text(tutorial.description)
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        .padding(.vertical, 4)
                    }
                }
            }
            .navigationTitle(AbacusContent.Learning.title)
        }
    }
}

struct TutorialDetailView: View {
    let tutorial: AbacusContent.Learning.Tutorial
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Text(tutorial.description)
                    .font(.body)
                    .foregroundColor(.secondary)
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(.systemGray6))
                    .cornerRadius(10)
                
                VStack(alignment: .leading, spacing: 15) {
                    Text("Steps")
                        .font(.title2)
                        .fontWeight(.bold)
                    
                    ForEach(Array(tutorial.steps.enumerated()), id: \.offset) { index, step in
                        HStack(alignment: .top, spacing: 12) {
                            Text("\(index + 1)")
                                .font(.headline)
                                .foregroundColor(.white)
                                .frame(width: 30, height: 30)
                                .background(Color.blue)
                                .clipShape(Circle())
                            
                            Text(step)
                                .font(.body)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                }
            }
            .padding()
        }
        .navigationTitle(tutorial.title)
        .navigationBarTitleDisplayMode(.inline)
    }
}

