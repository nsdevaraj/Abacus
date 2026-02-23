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
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    
    var body: some View {
        if horizontalSizeClass == .regular {
            // iPad: No NavigationView wrapper (uses parent NavigationSplitView)
            ScrollView {
                LazyVStack(spacing: 20) {
                    ForEach(Array(AbacusContent.Learning.tutorialList.enumerated()), id: \.offset) { index, tutorial in
                        NavigationLink(destination: TutorialDetailView(tutorial: tutorial)) {
                            TutorialCardView(tutorial: tutorial)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding()
            }
            .navigationTitle(AbacusContent.Learning.title)
            .navigationBarTitleDisplayMode(.large)
        } else {
            // iPhone: Wrapped in NavigationView
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
}

// MARK: - Tutorial Card View (for iPad)

struct TutorialCardView: View {
    let tutorial: AbacusContent.Learning.Tutorial
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "book.fill")
                    .font(.title)
                    .foregroundColor(.blue)
                    .frame(width: 50, height: 50)
                    .background(Color.blue.opacity(0.1))
                    .cornerRadius(10)
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(tutorial.title)
                        .font(.title3)
                        .fontWeight(.semibold)
                        .foregroundColor(.primary)
                    
                    Text(tutorial.description)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .lineLimit(2)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(.secondary)
            }
            .padding()
        }
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(.systemBackground))
                .shadow(color: .black.opacity(0.05), radius: 5, x: 0, y: 2)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.gray.opacity(0.2), lineWidth: 1)
        )
    }
}

struct TutorialDetailView: View {
    let tutorial: AbacusContent.Learning.Tutorial
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 30) {
                // Description card
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Image(systemName: "info.circle.fill")
                            .font(.title2)
                            .foregroundColor(.blue)
                        Text("About")
                            .font(.title3)
                            .fontWeight(.semibold)
                    }
                    
                    Text(tutorial.description)
                        .font(.body)
                        .foregroundColor(.secondary)
                }
                .padding(horizontalSizeClass == .regular ? 24 : 16)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color(.systemGray6))
                )
                
                // Steps section
                VStack(alignment: .leading, spacing: 20) {
                    HStack {
                        Image(systemName: "list.number")
                            .font(.title2)
                            .foregroundColor(.green)
                        Text("Steps")
                            .font(.title2)
                            .fontWeight(.bold)
                    }
                    
                    ForEach(Array(tutorial.steps.enumerated()), id: \.offset) { index, step in
                        HStack(alignment: .top, spacing: 16) {
                            Text("\(index + 1)")
                                .font(.headline)
                                .foregroundColor(.white)
                                .frame(width: horizontalSizeClass == .regular ? 40 : 30, 
                                       height: horizontalSizeClass == .regular ? 40 : 30)
                                .background(
                                    LinearGradient(
                                        colors: [Color.blue, Color.blue.opacity(0.7)],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .clipShape(Circle())
                                .shadow(color: .blue.opacity(0.3), radius: 3, x: 0, y: 2)
                            
                            Text(step)
                                .font(horizontalSizeClass == .regular ? .body : .subheadline)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        .padding(horizontalSizeClass == .regular ? 16 : 12)
                        .background(
                            RoundedRectangle(cornerRadius: 10)
                                .fill(Color(.systemBackground))
                                .shadow(color: .black.opacity(0.05), radius: 3, x: 0, y: 1)
                        )
                    }
                }
            }
            .padding(horizontalSizeClass == .regular ? 32 : 20)
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle(tutorial.title)
        .navigationBarTitleDisplayMode(horizontalSizeClass == .regular ? .large : .inline)
    }
}

