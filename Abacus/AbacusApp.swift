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
    var body: some View {
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

