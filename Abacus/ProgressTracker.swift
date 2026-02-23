//
//  ProgressTracker.swift
//  Abacus
//
//  Created by Devaraj N Subramanian on 23/02/26.
//

import Foundation
import Combine

// MARK: - Daily Log Model

struct DailyLog: Codable, Identifiable {
    let id: UUID
    let date: String // Format: "yyyy-MM-dd"
    var problemsSolved: Int
    var correctAnswers: Int
    var wrongAnswers: Int
    var highestLevel: Int
    var totalScore: Int
    var timeSpent: TimeInterval // in seconds
    
    init(date: String, problemsSolved: Int = 0, correctAnswers: Int = 0, wrongAnswers: Int = 0, highestLevel: Int = 1, totalScore: Int = 0, timeSpent: TimeInterval = 0) {
        self.id = UUID()
        self.date = date
        self.problemsSolved = problemsSolved
        self.correctAnswers = correctAnswers
        self.wrongAnswers = wrongAnswers
        self.highestLevel = highestLevel
        self.totalScore = totalScore
        self.timeSpent = timeSpent
    }
    
    var accuracy: Double {
        guard problemsSolved > 0 else { return 0 }
        return Double(correctAnswers) / Double(problemsSolved) * 100
    }
}

// MARK: - Progress Tracker

class ProgressTracker: ObservableObject {
    @Published var dailyLogs: [DailyLog] = []
    
    private let userDefaults = UserDefaults.standard
    private let logsKey = "dailyLogs"
    
    init() {
        loadLogs()
    }
    
    // MARK: - Public Methods
    
    func recordActivity(problemsSolved: Int, correct: Bool, level: Int, score: Int, timeSpent: TimeInterval = 60) {
        let today = getTodayDateString()
        
        if let index = dailyLogs.firstIndex(where: { $0.date == today }) {
            // Update existing log
            var log = dailyLogs[index]
            log.problemsSolved += problemsSolved
            log.correctAnswers += correct ? 1 : 0
            log.wrongAnswers += correct ? 0 : 1
            log.highestLevel = max(log.highestLevel, level)
            log.totalScore += score
            log.timeSpent += timeSpent
            dailyLogs[index] = log
        } else {
            // Create new log
            let log = DailyLog(
                date: today,
                problemsSolved: problemsSolved,
                correctAnswers: correct ? 1 : 0,
                wrongAnswers: correct ? 0 : 1,
                highestLevel: level,
                totalScore: score,
                timeSpent: timeSpent
            )
            dailyLogs.append(log)
        }
        
        saveLogs()
    }
    
    func getLog(for date: String) -> DailyLog? {
        return dailyLogs.first(where: { $0.date == date })
    }
    
    func getTodayLog() -> DailyLog? {
        return getLog(for: getTodayDateString())
    }
    
    func getTotalProblemsSolved() -> Int {
        return dailyLogs.reduce(0) { $0 + $1.problemsSolved }
    }
    
    func getCurrentStreak() -> Int {
        guard !dailyLogs.isEmpty else { return 0 }
        
        let sortedLogs = dailyLogs.sorted { $0.date > $1.date }
        var streak = 0
        var currentDate = Date()
        let calendar = Calendar.current
        
        for log in sortedLogs {
            let logDate = dateFromString(log.date)
            if calendar.isDate(logDate, inSameDayAs: currentDate) {
                streak += 1
                currentDate = calendar.date(byAdding: .day, value: -1, to: currentDate) ?? currentDate
            } else {
                break
            }
        }
        
        return streak
    }
    
    func getLogsForMonth(year: Int, month: Int) -> [DailyLog] {
        let monthString = String(format: "%04d-%02d", year, month)
        return dailyLogs.filter { $0.date.hasPrefix(monthString) }
    }
    
    // MARK: - Private Methods
    
    private func loadLogs() {
        if let data = userDefaults.data(forKey: logsKey),
           let logs = try? JSONDecoder().decode([DailyLog].self, from: data) {
            dailyLogs = logs
        }
    }
    
    private func saveLogs() {
        if let data = try? JSONEncoder().encode(dailyLogs) {
            userDefaults.set(data, forKey: logsKey)
        }
    }
    
    private func getTodayDateString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: Date())
    }
    
    private func dateFromString(_ string: String) -> Date {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.date(from: string) ?? Date()
    }
}
