//
//  CalendarView.swift
//  Abacus
//
//  Created by Devaraj N Subramanian on 23/02/26.
//

import SwiftUI

struct CalendarView: View {
    @ObservedObject var progressTracker: ProgressTracker
    @State private var currentDate = Date()
    @State private var selectedDate: String?
    
    private let calendar = Calendar.current
    private let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 30) {
                // Header Stats
                headerStatsView
                
                // Calendar Grid
                calendarGridView
                
                // Selected Date Details
                if let selectedDate = selectedDate {
                    selectedDateDetailsView(for: selectedDate)
                }
                
                // Overall Statistics
                overallStatsView
            }
            .padding()
        }
        .navigationTitle("Progress Calendar")
        .navigationBarTitleDisplayMode(.large)
        .onAppear {
            selectedDate = getTodayDateString()
        }
    }
    
    // MARK: - Header Stats View
    
    private var headerStatsView: some View {
        VStack(spacing: 16) {
            HStack(spacing: 16) {
                StatCard(
                    icon: "trophy.fill",
                    title: "Total Solved",
                    value: "\(progressTracker.getTotalProblemsSolved())",
                    color: .purple
                )
                
                StatCard(
                    icon: "flame.fill",
                    title: "Streak",
                    value: "\(progressTracker.getCurrentStreak()) days",
                    color: .orange
                )
            }
            
            if let todayLog = progressTracker.getTodayLog() {
                HStack(spacing: 16) {
                    StatCard(
                        icon: "calendar.badge.checkmark",
                        title: "Today",
                        value: "\(todayLog.problemsSolved)",
                        color: .green
                    )
                    
                    StatCard(
                        icon: "percent",
                        title: "Accuracy",
                        value: String(format: "%.0f%%", todayLog.accuracy),
                        color: .blue
                    )
                }
            }
        }
    }
    
    // MARK: - Calendar Grid View
    
    private var calendarGridView: some View {
        VStack(spacing: 16) {
            // Month Navigation
            HStack {
                Button(action: previousMonth) {
                    Image(systemName: "chevron.left")
                        .font(.title2)
                        .foregroundColor(.blue)
                        .padding(12)
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(10)
                }
                
                Spacer()
                
                Text(monthYearString)
                    .font(.title2)
                    .fontWeight(.bold)
                
                Spacer()
                
                Button(action: nextMonth) {
                    Image(systemName: "chevron.right")
                        .font(.title2)
                        .foregroundColor(.blue)
                        .padding(12)
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(10)
                }
            }
            
            // Day Headers
            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 7), spacing: 8) {
                ForEach(["S", "M", "T", "W", "T", "F", "S"], id: \.self) { day in
                    Text(day)
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.secondary)
                        .frame(maxWidth: .infinity)
                }
            }
            
            // Calendar Days
            LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 7), spacing: 8) {
                ForEach(calendarDays, id: \.id) { day in
                    if let dayNumber = day.dayNumber {
                        CalendarDayView(
                            day: dayNumber,
                            log: day.log,
                            isToday: day.isToday,
                            isSelected: day.dateString == selectedDate
                        )
                        .onTapGesture {
                            withAnimation(.spring(response: 0.3)) {
                                selectedDate = day.dateString
                            }
                        }
                    } else {
                        Color.clear
                            .frame(height: 60)
                    }
                }
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(.systemBackground))
                .shadow(color: .black.opacity(0.1), radius: 10)
        )
    }
    
    // MARK: - Selected Date Details View
    
    private func selectedDateDetailsView(for dateString: String) -> some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Image(systemName: "calendar.badge.checkmark")
                    .font(.title2)
                    .foregroundColor(.blue)
                
                Text(dateString == getTodayDateString() ? "Today's Activity" : "Activity for \(dateString)")
                    .font(.headline)
                    .fontWeight(.bold)
            }
            
            if let log = progressTracker.getLog(for: dateString) {
                VStack(spacing: 12) {
                    DetailRow(
                        icon: "checkmark.circle.fill",
                        title: "Problems Solved",
                        value: "\(log.problemsSolved)",
                        color: .green
                    )
                    
                    DetailRow(
                        icon: "chart.line.uptrend.xyaxis",
                        title: "Accuracy",
                        value: String(format: "%.1f%%", log.accuracy),
                        color: .blue
                    )
                    
                    DetailRow(
                        icon: "star.fill",
                        title: "Highest Level",
                        value: "Level \(log.highestLevel)",
                        color: .orange
                    )
                    
                    DetailRow(
                        icon: "trophy.fill",
                        title: "Total Score",
                        value: "\(log.totalScore)",
                        color: .purple
                    )
                    
                    DetailRow(
                        icon: "clock.fill",
                        title: "Time Spent",
                        value: formatTime(log.timeSpent),
                        color: .pink
                    )
                }
            } else {
                Text("No activity recorded for this day")
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 20)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(.systemBackground))
                .shadow(color: .black.opacity(0.1), radius: 10)
        )
        .transition(.scale.combined(with: .opacity))
    }
    
    // MARK: - Overall Stats View
    
    private var overallStatsView: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Image(systemName: "chart.bar.fill")
                    .font(.title2)
                    .foregroundColor(.purple)
                
                Text("Overall Statistics")
                    .font(.headline)
                    .fontWeight(.bold)
            }
            
            let totalCorrect = progressTracker.dailyLogs.reduce(0) { $0 + $1.correctAnswers }
            let totalWrong = progressTracker.dailyLogs.reduce(0) { $0 + $1.wrongAnswers }
            let totalProblems = totalCorrect + totalWrong
            let overallAccuracy = totalProblems > 0 ? Double(totalCorrect) / Double(totalProblems) * 100 : 0
            let totalScore = progressTracker.dailyLogs.reduce(0) { $0 + $1.totalScore }
            let totalTime = progressTracker.dailyLogs.reduce(0.0) { $0 + $1.timeSpent }
            let maxLevel = progressTracker.dailyLogs.map(\.highestLevel).max() ?? 1
            
            VStack(spacing: 12) {
                DetailRow(
                    icon: "checkmark.circle.fill",
                    title: "Correct Answers",
                    value: "\(totalCorrect)",
                    color: .green
                )
                
                DetailRow(
                    icon: "xmark.circle.fill",
                    title: "Wrong Answers",
                    value: "\(totalWrong)",
                    color: .red
                )
                
                DetailRow(
                    icon: "percent",
                    title: "Overall Accuracy",
                    value: String(format: "%.1f%%", overallAccuracy),
                    color: .blue
                )
                
                DetailRow(
                    icon: "trophy.fill",
                    title: "Total Score",
                    value: "\(totalScore)",
                    color: .purple
                )
                
                DetailRow(
                    icon: "star.fill",
                    title: "Highest Level Reached",
                    value: "Level \(maxLevel)",
                    color: .orange
                )
                
                DetailRow(
                    icon: "clock.fill",
                    title: "Total Time",
                    value: formatTime(totalTime),
                    color: .pink
                )
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(.systemBackground))
                .shadow(color: .black.opacity(0.1), radius: 10)
        )
    }
    
    // MARK: - Helper Methods
    
    private var monthYearString: String {
        let year = calendar.component(.year, from: currentDate)
        let month = calendar.component(.month, from: currentDate)
        return "\(monthNames[month - 1]) \(year)"
    }
    
    private var calendarDays: [CalendarDay] {
        let year = calendar.component(.year, from: currentDate)
        let month = calendar.component(.month, from: currentDate)
        
        guard let monthStart = calendar.date(from: DateComponents(year: year, month: month, day: 1)) else {
            return []
        }
        
        let firstWeekday = calendar.component(.weekday, from: monthStart) - 1
        let daysInMonth = calendar.range(of: .day, in: .month, for: monthStart)?.count ?? 0
        
        var days: [CalendarDay] = []
        
        // Empty days before month starts
        for _ in 0..<firstWeekday {
            days.append(CalendarDay(dayNumber: nil, dateString: "", log: nil, isToday: false))
        }
        
        // Days in month
        for day in 1...daysInMonth {
            let dateString = String(format: "%04d-%02d-%02d", year, month, day)
            let log = progressTracker.getLog(for: dateString)
            let isToday = dateString == getTodayDateString()
            days.append(CalendarDay(dayNumber: day, dateString: dateString, log: log, isToday: isToday))
        }
        
        return days
    }
    
    private func previousMonth() {
        withAnimation {
            currentDate = calendar.date(byAdding: .month, value: -1, to: currentDate) ?? currentDate
        }
    }
    
    private func nextMonth() {
        withAnimation {
            currentDate = calendar.date(byAdding: .month, value: 1, to: currentDate) ?? currentDate
        }
    }
    
    private func getTodayDateString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: Date())
    }
    
    private func formatTime(_ seconds: TimeInterval) -> String {
        let hours = Int(seconds) / 3600
        let minutes = (Int(seconds) % 3600) / 60
        
        if hours > 0 {
            return "\(hours)h \(minutes)m"
        } else {
            return "\(minutes)m"
        }
    }
}

// MARK: - Supporting Views

struct CalendarDay: Identifiable {
    let id = UUID()
    let dayNumber: Int?
    let dateString: String
    let log: DailyLog?
    let isToday: Bool
}

struct CalendarDayView: View {
    let day: Int
    let log: DailyLog?
    let isToday: Bool
    let isSelected: Bool
    
    var body: some View {
        VStack(spacing: 4) {
            Text("\(day)")
                .font(.system(size: 16, weight: isToday ? .bold : .regular))
                .foregroundColor(isToday ? .white : .primary)
            
            if let log = log {
                Circle()
                    .fill(activityColor(for: log))
                    .frame(width: 8, height: 8)
            }
        }
        .frame(height: 60)
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(backgroundColor)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(isSelected ? Color.blue : Color.clear, lineWidth: 3)
        )
        .scaleEffect(isSelected ? 1.05 : 1.0)
        .animation(.spring(response: 0.3), value: isSelected)
    }
    
    private var backgroundColor: Color {
        if isToday {
            return Color.blue
        } else if isSelected {
            return Color.blue.opacity(0.1)
        } else {
            return Color(.systemGray6)
        }
    }
    
    private func activityColor(for log: DailyLog) -> Color {
        if log.problemsSolved >= 20 {
            return .green
        } else if log.problemsSolved >= 10 {
            return .yellow
        } else {
            return .pink
        }
    }
}

struct StatCard: View {
    let icon: String
    let title: String
    let value: String
    let color: Color
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(color)
                
                Spacer()
            }
            
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
            
            Text(value)
                .font(.title2)
                .fontWeight(.bold)
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(color.opacity(0.1))
        )
    }
}

struct DetailRow: View {
    let icon: String
    let title: String
    let value: String
    let color: Color
    
    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(color)
                .frame(width: 30)
            
            Text(title)
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            Spacer()
            
            Text(value)
                .font(.subheadline)
                .fontWeight(.bold)
        }
        .padding(.vertical, 8)
        .padding(.horizontal, 12)
        .background(
            RoundedRectangle(cornerRadius: 10)
                .fill(Color(.systemGray6))
        )
    }
}

#Preview {
    NavigationView {
        CalendarView(progressTracker: ProgressTracker())
    }
}
