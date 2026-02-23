//
//  ProgressTracker.swift
//  Abacus
//
//  Created by Devaraj N Subramanian on 23/02/26.
//

import Foundation
import Combine

// MARK: - Problem Completion Model

struct ProblemCompletion: Codable, Identifiable {
    let id: UUID
    let islandId: Int
    let stageIndex: Int
    let problemNumber: Int // 1-25
    let completedDate: String // Format: "yyyy-MM-dd"
    let isCorrect: Bool
    
    init(islandId: Int, stageIndex: Int, problemNumber: Int, completedDate: String, isCorrect: Bool) {
        self.id = UUID()
        self.islandId = islandId
        self.stageIndex = stageIndex
        self.problemNumber = problemNumber
        self.completedDate = completedDate
        self.isCorrect = isCorrect
    }
    
    var displayDate: String {
        // Convert "yyyy-MM-dd" to "dd/MM"
        let components = completedDate.split(separator: "-")
        guard components.count == 3 else { return "" }
        return "\(components[2])/\(components[1])"
    }
}

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
    @Published var problemCompletions: [ProblemCompletion] = []
    
    private let userDefaults = UserDefaults.standard
    private let logsKey = "dailyLogs"
    private let completionsKey = "problemCompletions"
    
    init() {
        loadLogs()
        loadCompletions()
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
    
    // MARK: - Problem Completion Tracking
    
    func recordProblemCompletion(islandId: Int, stageIndex: Int, problemNumber: Int, isCorrect: Bool) {
        let today = getTodayDateString()
        
        // Check if this problem was already completed today
        if let existingIndex = problemCompletions.firstIndex(where: {
            $0.islandId == islandId &&
            $0.stageIndex == stageIndex &&
            $0.problemNumber == problemNumber &&
            $0.completedDate == today
        }) {
            // Update existing completion
            problemCompletions[existingIndex] = ProblemCompletion(
                islandId: islandId,
                stageIndex: stageIndex,
                problemNumber: problemNumber,
                completedDate: today,
                isCorrect: isCorrect
            )
        } else {
            // Add new completion
            let completion = ProblemCompletion(
                islandId: islandId,
                stageIndex: stageIndex,
                problemNumber: problemNumber,
                completedDate: today,
                isCorrect: isCorrect
            )
            problemCompletions.append(completion)
        }
        
        saveCompletions()
    }
    
    func getProblemCompletion(islandId: Int, stageIndex: Int, problemNumber: Int) -> ProblemCompletion? {
        return problemCompletions
            .filter { $0.islandId == islandId && $0.stageIndex == stageIndex && $0.problemNumber == problemNumber }
            .sorted { $0.completedDate > $1.completedDate }
            .first
    }
    
    func getStageProgress(islandId: Int, stageIndex: Int) -> (completed: Int, total: Int) {
        let completedProblems = Set(
            problemCompletions
                .filter { $0.islandId == islandId && $0.stageIndex == stageIndex }
                .map { $0.problemNumber }
        )
        return (completedProblems.count, 25)
    }
    
    func getNextAvailableProblem(islandId: Int, stageIndex: Int) -> Int {
        let completedProblems = Set(
            problemCompletions
                .filter { $0.islandId == islandId && $0.stageIndex == stageIndex }
                .map { $0.problemNumber }
        )
        
        // Find first uncompleted problem
        for i in 1...25 {
            if !completedProblems.contains(i) {
                return i
            }
        }
        
        // If all completed, return a random one for practice
        return Int.random(in: 1...25)
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
    
    func resetAllProgress() {
        dailyLogs.removeAll()
        problemCompletions.removeAll()
        saveLogs()
        saveCompletions()
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
    
    private func loadCompletions() {
        if let data = userDefaults.data(forKey: completionsKey),
           let completions = try? JSONDecoder().decode([ProblemCompletion].self, from: data) {
            problemCompletions = completions
        }
    }
    
    private func saveCompletions() {
        if let data = try? JSONEncoder().encode(problemCompletions) {
            userDefaults.set(data, forKey: completionsKey)
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
