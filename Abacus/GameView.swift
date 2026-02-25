//
//  GameView.swift
//  Abacus
//
//  Created by Devaraj N Subramanian on 23/02/26.
//

import SwiftUI
import Combine
import AVFoundation

// MARK: - Models

enum Operation: String, Codable {
    case add = "ADD"
    case sub = "SUB"
    case mul = "MUL"
    case div = "DIV"
    case fraction = "FRACTION"
    case bodmas = "BODMAS"
    case percent = "PERCENT"
    case sqrt = "SQRT"
}

struct Stage: Identifiable {
    let id = UUID()
    let name: String
    let operations: [Operation]
    let range: [Int] // [start, end] percentage
    let description: String
}

struct LevelConfig {
    let id: Int
    let label: String
    let title: String
    let abacusDesc: String
    let mentalDesc: String
    let operations: [Operation]
    let digitRange: [Int] // [min, max]
    let decimalPlaces: Int
    let allowNegative: Bool
    let stages: [Stage]
}

struct GameView: View {
    @StateObject private var progressTracker = ProgressTracker()
    @StateObject private var gameViewModel: GameViewModel
    
    init() {
        let tracker = ProgressTracker()
        _progressTracker = StateObject(wrappedValue: tracker)
        _gameViewModel = StateObject(wrappedValue: GameViewModel(progressTracker: tracker))
    }
    
    var body: some View {
        NavigationView {
            VStack(spacing: 30) {
                // Score and level display
                HStack {
                    VStack(alignment: .leading) {
                        Text("Island")
                            .font(.caption)
                            .foregroundColor(.secondary)
                        if let config = gameViewModel.currentLevelConfig {
                            Text(config.label.replacingOccurrences(of: "Island ", with: ""))
                                .font(.title2)
                                .fontWeight(.bold)
                        } else {
                            Text("\(gameViewModel.level)")
                                .font(.title2)
                                .fontWeight(.bold)
                        }
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.blue.opacity(0.1))
                    .cornerRadius(10)
                    
                    VStack(alignment: .leading) {
                        Text("Stage")
                            .font(.caption)
                            .foregroundColor(.secondary)
                        if let stage = gameViewModel.currentStage {
                            Text(stage.name)
                                .font(.caption)
                                .fontWeight(.bold)
                                .lineLimit(2)
                        } else {
                            Text("1")
                                .font(.title2)
                                .fontWeight(.bold)
                        }
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.purple.opacity(0.1))
                    .cornerRadius(10)
                    
                    VStack(alignment: .leading) {
                        Text("Score")
                            .font(.caption)
                            .foregroundColor(.secondary)
                        Text("\(gameViewModel.score)")
                            .font(.title2)
                            .fontWeight(.bold)
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.green.opacity(0.1))
                    .cornerRadius(10)
                    
                    // Today's progress
                    if let todayLog = progressTracker.getTodayLog() {
                        VStack(alignment: .leading) {
                            Text("Today")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Text("\(todayLog.problemsSolved)")
                                .font(.title2)
                                .fontWeight(.bold)
                        }
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.orange.opacity(0.1))
                        .cornerRadius(10)
                    }
                }
                .padding(.horizontal)
                
                if gameViewModel.gameState == .playing {
                    // Mode indicator badge
                    HStack(spacing: 8) {
                        Image(systemName: gameViewModel.modeIcon)
                            .font(.caption)
                        Text(gameViewModel.practiceMode.displayName)
                            .font(.caption)
                            .fontWeight(.bold)
                        
                        // Problem number indicator
                        Text("•")
                            .font(.caption)
                        Text("Problem \(gameViewModel.currentProblemNumber)")
                            .font(.caption)
                            .fontWeight(.bold)
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(
                        Capsule()
                            .fill(gameViewModel.modeColor.opacity(0.1))
                    )
                    .overlay(
                        Capsule()
                            .stroke(gameViewModel.modeColor, lineWidth: 1.5)
                    )
                    .foregroundColor(gameViewModel.modeColor)
                    
                    // Question display with audio button
                    VStack(spacing: 20) {
                        HStack(spacing: 15) {
                            // In mental mode, hide the question text
                            if gameViewModel.practiceMode == .visual || gameViewModel.practiceMode == .finger {
                                Text(gameViewModel.currentQuestion)
                                    .font(.system(size: 40, weight: .bold, design: .rounded))
                                    .foregroundColor(.primary)
                            } else {
                                VStack(spacing: 8) {
                                    Image(systemName: "ear.fill")
                                        .font(.system(size: 50))
                                        .foregroundColor(.purple)
                                    Text("Listen & Solve")
                                        .font(.title2)
                                        .fontWeight(.bold)
                                        .foregroundColor(.purple)
                                    Text("Question will be read aloud")
                                        .font(.caption)
                                        .foregroundColor(.secondary)
                                }
                            }
                            
                            Button(action: {
                                gameViewModel.announceQuestion()
                            }) {
                                Image(systemName: "speaker.wave.2.fill")
                                    .font(.title2)
                                    .foregroundColor(gameViewModel.modeColor)
                                    .padding(12)
                                    .background(gameViewModel.modeColor.opacity(0.1))
                                    .cornerRadius(10)
                            }
                        }
                        
                        if gameViewModel.practiceMode == .visual || gameViewModel.practiceMode == .finger {
                            Text("= ?")
                                .font(.system(size: 40, weight: .bold, design: .rounded))
                                .foregroundColor(.pink)
                        }
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color(.systemBackground))
                    .cornerRadius(15)
                    .shadow(radius: 5)
                    .padding(.horizontal)
                    
                    // Interactive Abacus or Finger Theory display
                    if gameViewModel.practiceMode == .visual || gameViewModel.practiceMode == .finger {
                        VStack(spacing: 10) {
                            if gameViewModel.practiceMode == .finger {
                                // Finger theory mode - show visual hint
                                HStack(spacing: 15) {
                                    Image(systemName: "hand.raised.fill")
                                        .font(.system(size: 60))
                                        .foregroundColor(.orange.opacity(0.3))
                                    
                                    VStack(alignment: .leading, spacing: 8) {
                                        Text("Finger Theory Mode")
                                            .font(.title2)
                                            .fontWeight(.bold)
                                            .foregroundColor(.orange)
                                        
                                        Text("Numbers < 100")
                                            .font(.subheadline)
                                            .foregroundColor(.secondary)
                                        
                                        Text("Use your fingers to visualize!")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                    }
                                }
                                .padding()
                                .frame(maxWidth: .infinity)
                                .background(
                                    RoundedRectangle(cornerRadius: 15)
                                        .fill(Color.orange.opacity(0.1))
                                )
                            }
                            
                            InteractiveAbacusView(viewModel: gameViewModel.abacusViewModel)
                                .frame(height: 300)
                        }
                        .padding(.horizontal)
                    } else {
                        // Mental mode - show a brain animation or placeholder
                        VStack(spacing: 20) {
                            Image(systemName: "brain.head.profile")
                                .font(.system(size: 100))
                                .foregroundColor(.purple.opacity(0.3))
                            
                            Text("Use your mental abacus")
                                .font(.title3)
                                .fontWeight(.semibold)
                                .foregroundColor(.purple.opacity(0.6))
                        }
                        .frame(height: 300)
                        .padding(.horizontal)
                    }
                    
                    // Answer input text field
                    VStack(spacing: 15) {
                        if gameViewModel.practiceMode == .mental || gameViewModel.practiceMode == .finger {
                            // Mental/Finger mode: user types directly
                            TextField("Type your answer", text: $gameViewModel.userAnswer)
                                .font(.system(size: 32, weight: .bold, design: .rounded))
                                .multilineTextAlignment(.center)
                                .padding()
                                .background(
                                    RoundedRectangle(cornerRadius: 15)
                                        .fill(gameViewModel.feedbackColor.opacity(0.1))
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: 15)
                                        .stroke(gameViewModel.feedbackColor, lineWidth: 3)
                                )
                                .padding(.horizontal)
                                .keyboardType(.decimalPad)
                                .onSubmit {
                                    gameViewModel.checkAnswer()
                                }
                        } else {
                            // Visual mode: abacus controls input
                            Text(gameViewModel.userAnswer.isEmpty ? "Use abacus to answer" : gameViewModel.userAnswer)
                                .font(.system(size: 32, weight: .bold, design: .rounded))
                                .multilineTextAlignment(.center)
                                .foregroundColor(gameViewModel.userAnswer.isEmpty ? .secondary : .primary)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(
                                    RoundedRectangle(cornerRadius: 15)
                                        .fill(gameViewModel.feedbackColor.opacity(0.1))
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: 15)
                                        .stroke(gameViewModel.feedbackColor, lineWidth: 3)
                                )
                                .padding(.horizontal)
                        }
                        
                        Button(action: {
                            gameViewModel.checkAnswer()
                        }) {
                            HStack {
                                Text(gameViewModel.feedback == nil ? "Check Answer" : "Next Question")
                                    .font(.title2)
                                    .fontWeight(.bold)
                                Image(systemName: gameViewModel.feedback == nil ? "checkmark.circle.fill" : "arrow.right.circle.fill")
                                    .font(.title2)
                            }
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(
                                gameViewModel.lastAnswerCorrect && gameViewModel.feedback != nil ?
                                Color.green : gameViewModel.modeColor
                            )
                            .cornerRadius(12)
                        }
                        .padding(.horizontal)
                    }
                    
                    // Feedback
                    if let feedback = gameViewModel.feedback {
                        HStack(spacing: 10) {
                            Image(systemName: gameViewModel.lastAnswerCorrect ? "checkmark.circle.fill" : "xmark.circle.fill")
                                .font(.title)
                            Text(feedback)
                                .font(.headline)
                        }
                        .foregroundColor(gameViewModel.lastAnswerCorrect ? .green : .red)
                        .padding()
                        .background(
                            RoundedRectangle(cornerRadius: 12)
                                .fill(gameViewModel.lastAnswerCorrect ? Color.green.opacity(0.1) : Color.red.opacity(0.1))
                        )
                        .transition(.scale.combined(with: .opacity))
                    }
                    
                } else if gameViewModel.gameState == .ready {
                    ReadyStateView(gameViewModel: gameViewModel)
                }
                
                Spacer()
            }
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    NavigationLink(destination: CalendarView(progressTracker: progressTracker)) {
                        Image(systemName: "calendar")
                            .font(.title3)
                            .foregroundColor(.blue)
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    if gameViewModel.gameState == .playing {
                        Button("New Game") {
                            gameViewModel.resetGame()
                        }
                    }
                }
            }
        }
    }
}

// MARK: - Syllabus Data

let JUNIOR_SYLLABUS: [LevelConfig] = [
    LevelConfig(
        id: 1,
        label: "Island 1",
        title: "Abacus & Finger Theory",
        abacusDesc: "Introduction to beads and +/- 5 combinations. 1 to 99 numbers.",
        mentalDesc: "Visualizing 1-digit simple addition/subtraction.",
        operations: [.add, .sub],
        digitRange: [1, 2],
        decimalPlaces: 0,
        allowNegative: false,
        stages: [
            Stage(name: "Bead Basics", operations: [.add], range: [1, 25], description: "Simple 1-digit addition."),
            Stage(name: "+5 Combinations", operations: [.add], range: [26, 50], description: "Test Week 1 focus."),
            Stage(name: "-5 Combinations", operations: [.sub], range: [51, 75], description: "Test Week 2 focus."),
            Stage(name: "2-Digit Simple", operations: [.add, .sub], range: [76, 100], description: "10-99 range basics.")
        ]
    ),
    LevelConfig(
        id: 2,
        label: "Island 2",
        title: "+10 Combinations",
        abacusDesc: "Mastering the carry rule with 10-complements. 1 to 99 range.",
        mentalDesc: "Fast 1-digit +/- 5 visualization.",
        operations: [.add, .sub],
        digitRange: [1, 2],
        decimalPlaces: 0,
        allowNegative: false,
        stages: [
            Stage(name: "Friends of 10 (+)", operations: [.add], range: [1, 33], description: "Test Week 3 focus."),
            Stage(name: "Advanced +10", operations: [.add], range: [34, 66], description: "Test Week 4 focus."),
            Stage(name: "2-Digit Integration", operations: [.add, .sub], range: [67, 100], description: "Test Week 5 focus.")
        ]
    ),
    LevelConfig(
        id: 3,
        label: "Island 3",
        title: "-10 Combinations",
        abacusDesc: "Mastering borrowing with 10-complements. 1 to 99 range.",
        mentalDesc: "Mixed +/- 5 combinations mental practice.",
        operations: [.add, .sub],
        digitRange: [1, 2],
        decimalPlaces: 0,
        allowNegative: false,
        stages: [
            Stage(name: "Friends of 10 (-)", operations: [.sub], range: [1, 40], description: "Test Week 6 focus."),
            Stage(name: "-10 Logic", operations: [.sub], range: [41, 80], description: "Test Week 7 focus."),
            Stage(name: "2-Digit Mastery", operations: [.add, .sub], range: [81, 100], description: "Test Week 8 focus.")
        ]
    ),
    LevelConfig(
        id: 4,
        label: "Island 4",
        title: "Combination Fusion",
        abacusDesc: "Integrating all +/- 5 and +10 combinations. Numbers 1-99.",
        mentalDesc: "1 & 2 digit mental theory (non-combination).",
        operations: [.add, .sub],
        digitRange: [1, 2],
        decimalPlaces: 0,
        allowNegative: false,
        stages: [
            Stage(name: "Fused Theory", operations: [.add, .sub], range: [1, 50], description: "All combinations mix."),
            Stage(name: "Mental Prep", operations: [.add, .sub], range: [51, 100], description: "Non-combination speed focus.")
        ]
    ),
    LevelConfig(
        id: 5,
        label: "Island 5",
        title: "Intro to Multiplication",
        abacusDesc: "Double combinations (-10, +6 to +9, -6 to -9). Multiplication 2x1.",
        mentalDesc: "Mental +/- 5, +/- 10 combinations.",
        operations: [.add, .sub, .mul],
        digitRange: [1, 2],
        decimalPlaces: 0,
        allowNegative: false,
        stages: [
            Stage(name: "Double Combinations", operations: [.add, .sub], range: [1, 40], description: "Complex +/- 6-9 moves."),
            Stage(name: "Mult Basics (2x1)", operations: [.mul], range: [41, 70], description: "Tables 1-9 focus."),
            Stage(name: "Mixed Mental", operations: [.add, .sub], range: [71, 100], description: "Level 5 mental theory.")
        ]
    ),
    LevelConfig(
        id: 6,
        label: "Island 6",
        title: "Decimals & Large Mult",
        abacusDesc: "2 & 3 digit combinations. Decimals (3 digits). Mult up to 4x1.",
        mentalDesc: "2-digit all combinations mental add/sub.",
        operations: [.add, .sub, .mul],
        digitRange: [2, 4],
        decimalPlaces: 2,
        allowNegative: false,
        stages: [
            Stage(name: "3-Digit Add/Sub", operations: [.add, .sub], range: [1, 30], description: "All combinations."),
            Stage(name: "Decimal Intro", operations: [.add, .sub], range: [31, 60], description: "3-digit decimal focus."),
            Stage(name: "Advanced Mult", operations: [.mul], range: [61, 100], description: "2x1, 3x1, and 4x1 logic.")
        ]
    ),
    LevelConfig(
        id: 7,
        label: "Island 7",
        title: "Division Journey",
        abacusDesc: "Up to 4-digit combinations. Decimals (4 digits). Mult 2x2. Div up to 4÷1.",
        mentalDesc: "2 & 3 digit mental theory with decimals.",
        operations: [.add, .sub, .mul, .div],
        digitRange: [2, 4],
        decimalPlaces: 3,
        allowNegative: false,
        stages: [
            Stage(name: "4-Digit Mastery", operations: [.add, .sub], range: [1, 25], description: "All combinations."),
            Stage(name: "Mult 2x2", operations: [.mul], range: [26, 50], description: "Grid multiplication."),
            Stage(name: "Division (4÷1)", operations: [.div], range: [51, 75], description: "Basic quotient moves."),
            Stage(name: "Decimal Flow", operations: [.add, .sub], range: [76, 100], description: "4-digit decimal focus.")
        ]
    ),
    LevelConfig(
        id: 8,
        label: "Island 8",
        title: "Mastery Operations",
        abacusDesc: "Mult 3x2. Div up to 4÷2. 3 & 4 digit complex combinations.",
        mentalDesc: "Mental 4-digit decimals and 2x2 mult.",
        operations: [.add, .sub, .mul, .div],
        digitRange: [3, 4],
        decimalPlaces: 4,
        allowNegative: true,
        stages: [
            Stage(name: "Complex Mix", operations: [.add, .sub], range: [1, 30], description: "High speed 4-digit."),
            Stage(name: "Mult 3x2", operations: [.mul], range: [31, 60], description: "Larger factors."),
            Stage(name: "Div (4÷2)", operations: [.div], range: [61, 100], description: "Multi-digit divisor logic.")
        ]
    ),
    LevelConfig(
        id: 9,
        label: "Island 9",
        title: "Fractions & BODMAS",
        abacusDesc: "4 & 5 digit add/sub. Mult 4x2. Div up to 5÷2. Fractions & BODMAS.",
        mentalDesc: "Mental 2x2 and 3x2 multiplication.",
        operations: [.add, .sub, .mul, .div, .fraction, .bodmas],
        digitRange: [4, 5],
        decimalPlaces: 0,
        allowNegative: true,
        stages: [
            Stage(name: "5-Digit Precision", operations: [.add, .sub], range: [1, 25], description: "Massive bead control."),
            Stage(name: "Div 5÷2", operations: [.div], range: [26, 50], description: "Elite division."),
            Stage(name: "Fraction Intro", operations: [.fraction], range: [51, 75], description: "Conversions & basic add."),
            Stage(name: "Order of Ops", operations: [.bodmas], range: [76, 100], description: "Brackets and priority.")
        ]
    ),
    LevelConfig(
        id: 10,
        label: "Island 10",
        title: "Percentages & Combined",
        abacusDesc: "3x3 Mult, 4x2 Mult. 5-digit decimals. Fractions combined. Percentages.",
        mentalDesc: "Mental decimal mult/div and fractions.",
        operations: [.add, .sub, .mul, .div, .fraction, .percent],
        digitRange: [4, 5],
        decimalPlaces: 5,
        allowNegative: true,
        stages: [
            Stage(name: "Mult 3x3", operations: [.mul], range: [1, 30], description: "Ultimate multiplication."),
            Stage(name: "Percentage Path", operations: [.percent], range: [31, 60], description: "Interest and ratios."),
            Stage(name: "Decimal Master", operations: [.add, .sub, .mul, .div], range: [61, 100], description: "Decimal complexity.")
        ]
    ),
    LevelConfig(
        id: 11,
        label: "Island 11",
        title: "Grand Mastery",
        abacusDesc: "5÷2 Div. Square Roots (3 & 4 digits). Combined operations.",
        mentalDesc: "Mixed calculations with BODMAS rule.",
        operations: [.add, .sub, .mul, .div, .sqrt, .bodmas],
        digitRange: [4, 5],
        decimalPlaces: 5,
        allowNegative: true,
        stages: [
            Stage(name: "Root Seeker", operations: [.sqrt], range: [1, 40], description: "3 & 4 digit roots."),
            Stage(name: "Elite BODMAS", operations: [.bodmas], range: [41, 100], description: "The final mental test.")
        ]
    )
]

// MARK: - Game View Model

class GameViewModel: ObservableObject {
    @Published var score: Int = 0
    @Published var level: Int = 1
    @Published var currentQuestion: String = ""
    @Published var answerOptions: [Int] = []
    @Published var correctAnswer: Int = 0
    @Published var gameState: GameState = .ready
    @Published var feedback: String?
    @Published var lastAnswerCorrect: Bool = false
    @Published var selectedLevel: Int = 1
    @Published var selectedStageIndex: Int = 0
    @Published var userAnswer: String = ""
    @Published var abacusViewModel = AbacusViewModel(numberOfColumns: 10)
    @Published var practiceMode: PracticeMode = .visual
    @Published var currentProblemNumber: Int = 1
    
    let progressTracker: ProgressTracker
    
    private let speechSynthesizer = AVSpeechSynthesizer()
    private var cancellables = Set<AnyCancellable>()
    private var sessionStartTime: Date?
    
    enum PracticeMode: String, CaseIterable {
        case visual = "Visual (with Abacus)"
        case mental = "Mental (Audio Only)"
        case finger = "Finger Theory"
        
        var displayName: String {
            switch self {
            case .visual: return "Visual Mode"
            case .mental: return "Mental Mode"
            case .finger: return "Finger Theory"
            }
        }
        
        var icon: String {
            switch self {
            case .visual: return "eye.fill"
            case .mental: return "ear.fill"
            case .finger: return "hand.raised.fill"
            }
        }
        
        var color: Color {
            switch self {
            case .visual: return .blue
            case .mental: return .purple
            case .finger: return .orange
            }
        }
    }
    
    var feedbackColor: Color {
        if feedback == nil { return .gray.opacity(0.3) }
        return lastAnswerCorrect ? .green : .red
    }
    
    var modeColor: Color {
        return practiceMode.color
    }
    
    var modeIcon: String {
        return practiceMode.icon
    }
    
    var currentLevelConfig: LevelConfig? {
        return JUNIOR_SYLLABUS.first { $0.id == selectedLevel }
    }
    
    var currentStage: Stage? {
        guard let config = currentLevelConfig,
              selectedStageIndex < config.stages.count else { return nil }
        return config.stages[selectedStageIndex]
    }
    
    var levelDescription: String {
        guard let config = currentLevelConfig else {
            return "Numbers 1-10, addition only"
        }
        return config.abacusDesc
    }
    
    var stageDescription: String {
        guard let stage = currentStage else {
            return "Select a stage to begin"
        }
        return stage.description
    }
    
    init(progressTracker: ProgressTracker = ProgressTracker()) {
        self.progressTracker = progressTracker
    }
    
    func setupAbacusBinding() {
        // Only sync abacus value changes to userAnswer in visual mode
        if practiceMode == .visual {
            abacusViewModel.$columns
                .map { columns -> Int in
                    var total = 0
                    for (index, column) in columns.enumerated() {
                        let placeValue = Int(pow(10.0, Double(index)))
                        total += column.value * placeValue
                    }
                    return total
                }
                .sink { [weak self] value in
                    self?.userAnswer = "\(value)"
                }
                .store(in: &cancellables)
        }
    }
    
    enum GameState {
        case ready
        case playing
    }
    
    func startGame() {
        gameState = .playing
        score = 0
        level = selectedLevel
        userAnswer = ""
        abacusViewModel.reset()
        sessionStartTime = Date()
        
        // Get the next available problem for this stage and practice mode
        currentProblemNumber = progressTracker.getNextAvailableProblem(
            islandId: selectedLevel,
            stageIndex: selectedStageIndex,
            practiceMode: practiceMode.rawValue
        )
        
        // Setup abacus binding if in visual mode
        setupAbacusBinding()
        
        generateQuestion()
        
        // Announce the first question
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            self?.announceQuestion()
        }
    }
    
    func resetGame() {
        gameState = .ready
        score = 0
        level = 1
        feedback = nil
        userAnswer = ""
        abacusViewModel.reset()
    }
    
    func announceQuestion() {
        speechSynthesizer.stopSpeaking(at: .immediate)
        
        let utterance = AVSpeechUtterance(string: "What is \(currentQuestion.replacingOccurrences(of: "×", with: "times"))?")
        utterance.voice = AVSpeechSynthesisVoice(language: "en-US")
        utterance.rate = 0.5
        utterance.pitchMultiplier = 1.1
        
        speechSynthesizer.speak(utterance)
    }
    
    func generateQuestion() {
        feedback = nil
        userAnswer = ""
        abacusViewModel.reset()
        
        guard let config = currentLevelConfig,
              let stage = currentStage else {
            // Fallback to simple question
            generateSimpleQuestion()
            return
        }
        
        // Get digit range from config
        let minDigits = config.digitRange[0]
        let maxDigits = config.digitRange.count > 1 ? config.digitRange[1] : config.digitRange[0]
        
        // Calculate max number based on digits
        var maxNum = Int(pow(10.0, Double(maxDigits))) - 1
        var minNum = Int(pow(10.0, Double(minDigits - 1)))
        
        // FINGER THEORY MODE: Always use numbers less than 100
        if practiceMode == .finger {
            maxNum = min(maxNum, 99)
            minNum = min(minNum, 1)
        }
        
        // Choose operation from stage's allowed operations
        guard let operation = stage.operations.randomElement() else {
            generateSimpleQuestion()
            return
        }
        
        let num1 = Int.random(in: minNum...maxNum)
        let num2 = Int.random(in: minNum...maxNum)
        
        switch operation {
        case .add:
            currentQuestion = "\(num1) + \(num2)"
            correctAnswer = num1 + num2
            
        case .sub:
            let larger = max(num1, num2)
            let smaller = min(num1, num2)
            currentQuestion = "\(larger) - \(smaller)"
            correctAnswer = larger - smaller
            
        case .mul:
            // For multiplication, use smaller numbers
            let mult1 = Int.random(in: 1...min(12, maxNum / 10))
            let mult2 = Int.random(in: 1...min(12, maxNum / 10))
            currentQuestion = "\(mult1) × \(mult2)"
            correctAnswer = mult1 * mult2
            
        case .div:
            // Generate division problems with whole number results
            let divisor = Int.random(in: 2...12)
            let quotient = Int.random(in: 1...min(99, maxNum / divisor))
            let dividend = divisor * quotient
            currentQuestion = "\(dividend) ÷ \(divisor)"
            correctAnswer = quotient
            
        default:
            // For other operations, default to addition
            currentQuestion = "\(num1) + \(num2)"
            correctAnswer = num1 + num2
        }
    }
    
    private func generateSimpleQuestion() {
        let num1 = Int.random(in: 1...10)
        let num2 = Int.random(in: 1...10)
        currentQuestion = "\(num1) + \(num2)"
        correctAnswer = num1 + num2
    }
    
    func generateAnswerOptions() {
        var options = Set<Int>()
        options.insert(correctAnswer)
        
        // Generate wrong answers
        while options.count < 4 {
            let offset = Int.random(in: 1...10)
            let wrongAnswer = Bool.random() ? correctAnswer + offset : correctAnswer - offset
            if wrongAnswer >= 0 && wrongAnswer != correctAnswer {
                options.insert(wrongAnswer)
            }
        }
        
        answerOptions = Array(options).shuffled()
    }
    
    func checkAnswer() {
        // If we already have feedback, move to next question
        if feedback != nil {
            // Move to next problem
            currentProblemNumber = progressTracker.getNextAvailableProblem(
                islandId: selectedLevel,
                stageIndex: selectedStageIndex,
                practiceMode: practiceMode.rawValue
            )
            generateQuestion()
            announceQuestion()
            return
        }
        
        // Check if user has entered an answer
        guard let answer = Int(userAnswer.trimmingCharacters(in: .whitespaces)) else {
            return
        }
        
        if answer == correctAnswer {
            lastAnswerCorrect = true
            feedback = "Correct! 🎉"
            score += 10 * level
            
            // Record problem completion with practice mode
            progressTracker.recordProblemCompletion(
                islandId: selectedLevel,
                stageIndex: selectedStageIndex,
                problemNumber: currentProblemNumber,
                isCorrect: true,
                practiceMode: practiceMode.rawValue
            )
            
            // Record progress with practice mode
            let timeSpent = sessionStartTime != nil ? Date().timeIntervalSince(sessionStartTime!) : 60
            progressTracker.recordActivity(
                problemsSolved: 1,
                correct: true,
                level: level,
                score: 10 * level,
                timeSpent: timeSpent / 60, // Approximate time per question
                practiceMode: practiceMode.rawValue
            )
            
            // Update abacus to show correct answer (only in visual/finger mode)
            if practiceMode == .visual || practiceMode == .finger {
                abacusViewModel.setValue(correctAnswer)
            }
            
            // Level up every 5 correct answers
            if (score / 10) % 5 == 0 {
                level += 1
            }
        } else {
            lastAnswerCorrect = false
            feedback = "Not quite! The answer is \(correctAnswer)"
            
            // Record problem completion as incorrect with practice mode
            progressTracker.recordProblemCompletion(
                islandId: selectedLevel,
                stageIndex: selectedStageIndex,
                problemNumber: currentProblemNumber,
                isCorrect: false,
                practiceMode: practiceMode.rawValue
            )
            
            // Record progress with practice mode
            let timeSpent = sessionStartTime != nil ? Date().timeIntervalSince(sessionStartTime!) : 60
            progressTracker.recordActivity(
                problemsSolved: 1,
                correct: false,
                level: level,
                score: 0,
                timeSpent: timeSpent / 60,
                practiceMode: practiceMode.rawValue
            )
            
            // Show correct answer on abacus (only in visual/finger mode)
            if practiceMode == .visual || practiceMode == .finger {
                abacusViewModel.setValue(correctAnswer)
            }
        }
    }
}

// MARK: - Interactive Abacus View

struct InteractiveAbacusView: View {
    @ObservedObject var viewModel: AbacusViewModel
    
    var body: some View {
        VStack(spacing: 0) {
            // Top frame
            Rectangle()
                .fill(Color.brown.gradient)
                .frame(height: 8)
                .shadow(radius: 2)
            
            // Abacus beads area
            ZStack {
                // Background
                RoundedRectangle(cornerRadius: 10)
                    .fill(
                        LinearGradient(
                            colors: [Color.orange.opacity(0.3), Color.brown.opacity(0.2)],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )
                    .shadow(color: .black.opacity(0.1), radius: 5, x: 0, y: 2)
                
                // Interactive Columns
                HStack(spacing: 0) {
                    ForEach(Array(viewModel.columns.enumerated().reversed()), id: \.element.id) { index, column in
                        InteractiveAbacusColumnView(
                            column: column,
                            columnIndex: index,
                            onUpperBeadTap: { viewModel.toggleUpperBead(at: index) },
                            onLowerBeadTap: { beadIndex in
                                viewModel.toggleLowerBead(at: index, beadIndex: beadIndex)
                            }
                        )
                        .frame(maxWidth: .infinity)
                    }
                }
                .padding(.horizontal, 8)
            }
            
            // Bottom frame
            Rectangle()
                .fill(Color.brown.gradient)
                .frame(height: 8)
                .shadow(radius: 2)
        }
    }
}

struct InteractiveAbacusColumnView: View {
    let column: AbacusColumn
    let columnIndex: Int
    let onUpperBeadTap: () -> Void
    let onLowerBeadTap: (Int) -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            // Upper bead (heaven - value 5)
            VStack(spacing: 4) {
                Spacer()
                    .frame(height: 10)
                
                Circle()
                    .fill(
                        LinearGradient(
                            colors: column.upperBeadActive ? 
                                [Color.red, Color.red.opacity(0.7)] :
                                [Color.gray.opacity(0.6), Color.gray.opacity(0.4)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 22, height: 22)
                    .overlay(
                        Circle()
                            .stroke(Color.white.opacity(0.3), lineWidth: 1)
                    )
                    .shadow(color: column.upperBeadActive ? Color.red.opacity(0.5) : .clear, radius: 4)
                    .offset(y: column.upperBeadActive ? 15 : 0)
                    .onTapGesture {
                        withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                            onUpperBeadTap()
                        }
                    }
                
                Spacer()
                    .frame(height: 8)
            }
            .frame(height: 70)
            
            // Middle bar (divider)
            Rectangle()
                .fill(Color.brown.opacity(0.8))
                .frame(height: 3)
                .cornerRadius(1.5)
            
            // Lower beads (earth - value 1 each)
            VStack(spacing: 4) {
                Spacer()
                    .frame(height: 8)
                
                ForEach(0..<4, id: \.self) { beadIndex in
                    Circle()
                        .fill(
                            LinearGradient(
                                colors: column.lowerBeadsActive[beadIndex] ?
                                    [Color.blue, Color.blue.opacity(0.7)] :
                                    [Color.gray.opacity(0.6), Color.gray.opacity(0.4)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 22, height: 22)
                        .overlay(
                            Circle()
                                .stroke(Color.white.opacity(0.3), lineWidth: 1)
                        )
                        .shadow(color: column.lowerBeadsActive[beadIndex] ? Color.blue.opacity(0.5) : .clear, radius: 4)
                        .offset(y: column.lowerBeadsActive[beadIndex] ? -15 : 0)
                        .onTapGesture {
                            withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                                onLowerBeadTap(beadIndex)
                            }
                        }
                }
                
                Spacer()
                    .frame(height: 10)
            }
            .frame(height: 140)
        }
        .background(
            Rectangle()
                .fill(Color.brown.opacity(0.4))
                .frame(width: 3)
        )
        .padding(.vertical, 4)
    }
}

// MARK: - Static Abacus View (for display only)

struct AbacusView: View {
    @Binding var value: Int
    let columns: Int = 11
    
    var body: some View {
        VStack(spacing: 0) {
            // Top frame
            Rectangle()
                .fill(Color.brown.gradient)
                .frame(height: 8)
                .shadow(radius: 2)
            
            // Abacus beads area
            ZStack {
                // Background
                RoundedRectangle(cornerRadius: 10)
                    .fill(
                        LinearGradient(
                            colors: [Color.orange.opacity(0.3), Color.brown.opacity(0.2)],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )
                    .shadow(color: .black.opacity(0.1), radius: 5, x: 0, y: 2)
                
                // Columns
                HStack(spacing: 0) {
                    ForEach(0..<columns, id: \.self) { column in
                        GameAbacusColumn(
                            value: getDigit(at: columns - 1 - column),
                            isActive: value > 0 && column < String(value).count
                        )
                        .frame(maxWidth: .infinity)
                    }
                }
                .padding(.horizontal, 8)
            }
            
            // Bottom frame
            Rectangle()
                .fill(Color.brown.gradient)
                .frame(height: 8)
                .shadow(radius: 2)
        }
        .padding()
    }
    
    private func getDigit(at position: Int) -> Int {
        let valueString = String(value)
        let reversedString = String(valueString.reversed())
        
        guard position < reversedString.count else { return 0 }
        let index = reversedString.index(reversedString.startIndex, offsetBy: position)
        return Int(String(reversedString[index])) ?? 0
    }
}

// MARK: - Abacus Column

struct GameAbacusColumn: View {
    let value: Int
    let isActive: Bool
    
    var body: some View {
        VStack(spacing: 4) {
            // Top beads (heaven - represents 5)
            VStack(spacing: 2) {
                ForEach(0..<1, id: \.self) { _ in
                    Circle()
                        .fill(
                            LinearGradient(
                                colors: isActive && value >= 5 ? 
                                    [Color.red, Color.red.opacity(0.7)] :
                                    [Color.gray.opacity(0.6), Color.gray.opacity(0.4)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 20, height: 20)
                        .overlay(
                            Circle()
                                .stroke(Color.white.opacity(0.3), lineWidth: 1)
                        )
                        .shadow(radius: 2)
                        .offset(y: (isActive && value >= 5) ? 20 : 0)
                }
            }
            .frame(height: 40)
            
            // Divider bar
            Rectangle()
                .fill(Color.brown.opacity(0.8))
                .frame(height: 3)
                .cornerRadius(1.5)
            
            // Bottom beads (earth - each represents 1)
            VStack(spacing: 2) {
                ForEach(0..<4, id: \.self) { index in
                    let earthValue = value % 5
                    Circle()
                        .fill(
                            LinearGradient(
                                colors: isActive && index < earthValue ?
                                    [Color.blue, Color.blue.opacity(0.7)] :
                                    [Color.gray.opacity(0.6), Color.gray.opacity(0.4)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 20, height: 20)
                        .overlay(
                            Circle()
                                .stroke(Color.white.opacity(0.3), lineWidth: 1)
                        )
                        .shadow(radius: 2)
                        .offset(y: (isActive && index < earthValue) ? -20 : 0)
                }
            }
            .frame(height: 120)
        }
        .padding(.vertical, 4)
        .animation(.spring(response: 0.3, dampingFraction: 0.7), value: value)
    }
}

// MARK: - Ready State View

struct ReadyStateView: View {
    @ObservedObject var gameViewModel: GameViewModel
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                Image(systemName: gameViewModel.modeIcon)
                    .font(.system(size: 80))
                    .foregroundColor(gameViewModel.modeColor)
                
                Text("Abacus Math Challenge")
                    .font(.title)
                    .fontWeight(.bold)
                
                Text("Test your mental math skills!")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                PracticeModeSelector(gameViewModel: gameViewModel)
                
                LevelSelector(gameViewModel: gameViewModel)
                
                StageSelector(gameViewModel: gameViewModel)
                
                StartGameButton(gameViewModel: gameViewModel)
            }
            .padding()
        }
    }
}

// MARK: - Practice Mode Selector

struct PracticeModeSelector: View {
    @ObservedObject var gameViewModel: GameViewModel
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Practice Mode")
                .font(.headline)
                .foregroundColor(.primary)
            
            VStack(spacing: 12) {
                ForEach(GameViewModel.PracticeMode.allCases, id: \.self) { mode in
                    PracticeModeButton(mode: mode, gameViewModel: gameViewModel)
                }
            }
        }
        .padding(.horizontal, 40)
    }
}

struct PracticeModeButton: View {
    let mode: GameViewModel.PracticeMode
    @ObservedObject var gameViewModel: GameViewModel
    
    var isSelected: Bool {
        gameViewModel.practiceMode == mode
    }
    
    var modeTitle: String {
        switch mode {
        case .visual: return "Visual"
        case .mental: return "Mental"
        case .finger: return "Finger"
        }
    }
    
    var modeSubtitle: String {
        switch mode {
        case .visual: return "With Abacus"
        case .mental: return "Audio Only"
        case .finger: return "< 100 Numbers"
        }
    }
    
    var body: some View {
        Button(action: {
            withAnimation {
                gameViewModel.practiceMode = mode
            }
        }) {
            HStack(spacing: 8) {
                Image(systemName: mode.icon)
                    .font(.title3)
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(modeTitle)
                        .font(.headline)
                        .fontWeight(.bold)
                    Text(modeSubtitle)
                        .font(.caption)
                        .foregroundColor(isSelected ? .white.opacity(0.8) : .secondary)
                }
            }
            .foregroundColor(isSelected ? .white : .primary)
            .frame(maxWidth: .infinity)
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(isSelected ? mode.color : Color.gray.opacity(0.1))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(isSelected ? mode.color : Color.gray.opacity(0.3), lineWidth: 2)
            )
        }
    }
}

// MARK: - Level Selector

struct LevelSelector: View {
    @ObservedObject var gameViewModel: GameViewModel
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Select Island")
                .font(.headline)
                .foregroundColor(.primary)
            
            if let config = gameViewModel.currentLevelConfig {
                Text(config.label)
                    .font(.system(size: 32, weight: .bold, design: .rounded))
                    .foregroundColor(.blue)
                    .frame(maxWidth: .infinity)
                
                Text(config.title)
                    .font(.title3)
                    .fontWeight(.semibold)
                    .foregroundColor(.primary)
                    .frame(maxWidth: .infinity)
            }
            
            HStack(spacing: 12) {
                Button(action: {
                    if gameViewModel.selectedLevel > 1 {
                        gameViewModel.selectedLevel -= 1
                        gameViewModel.selectedStageIndex = 0
                    }
                }) {
                    Image(systemName: "chevron.left.circle.fill")
                        .font(.system(size: 44))
                        .foregroundColor(gameViewModel.selectedLevel > 1 ? .blue : .gray)
                }
                .disabled(gameViewModel.selectedLevel <= 1)
                
                Slider(value: Binding(
                    get: { Double(gameViewModel.selectedLevel) },
                    set: { 
                        gameViewModel.selectedLevel = Int($0)
                        gameViewModel.selectedStageIndex = 0
                    }
                ), in: 1...Double(JUNIOR_SYLLABUS.count), step: 1)
                .accentColor(.blue)
                
                Button(action: {
                    if gameViewModel.selectedLevel < JUNIOR_SYLLABUS.count {
                        gameViewModel.selectedLevel += 1
                        gameViewModel.selectedStageIndex = 0
                    }
                }) {
                    Image(systemName: "chevron.right.circle.fill")
                        .font(.system(size: 44))
                        .foregroundColor(gameViewModel.selectedLevel < JUNIOR_SYLLABUS.count ? .blue : .gray)
                }
                .disabled(gameViewModel.selectedLevel >= JUNIOR_SYLLABUS.count)
            }
            
            LevelIndicators(gameViewModel: gameViewModel)
            
            Text(gameViewModel.levelDescription)
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .frame(maxWidth: .infinity)
                .padding(.top, 4)
        }
        .padding(.horizontal, 40)
    }
}

struct LevelIndicators: View {
    @ObservedObject var gameViewModel: GameViewModel
    
    var body: some View {
        HStack(spacing: 4) {
            ForEach(1...JUNIOR_SYLLABUS.count, id: \.self) { level in
                RoundedRectangle(cornerRadius: 4)
                    .fill(level <= gameViewModel.selectedLevel ? Color.blue : Color.gray.opacity(0.3))
                    .frame(height: 8)
            }
        }
        .padding(.top, 4)
    }
}

// MARK: - Stage Selector

struct StageSelector: View {
    @ObservedObject var gameViewModel: GameViewModel
    
    var body: some View {
        if let config = gameViewModel.currentLevelConfig {
            VStack(alignment: .leading, spacing: 12) {
                Text("Select Stage")
                    .font(.headline)
                    .foregroundColor(.primary)
                
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(Array(config.stages.enumerated()), id: \.element.id) { index, stage in
                            StageCardWithGrid(
                                stage: stage,
                                index: index,
                                islandId: config.id,
                                isSelected: gameViewModel.selectedStageIndex == index,
                                progressTracker: gameViewModel.progressTracker,
                                onTap: {
                                    withAnimation {
                                        gameViewModel.selectedStageIndex = index
                                    }
                                }
                            )
                        }
                    }
                    .padding(.horizontal, 40)
                }
            }
            .padding(.top, 10)
        }
    }
}

struct StageCard: View {
    let stage: Stage
    let index: Int
    let isSelected: Bool
    let onTap: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text("\(index + 1)")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(width: 24, height: 24)
                    .background(
                        Circle()
                            .fill(isSelected ? Color.blue : Color.gray)
                    )
                
                Spacer()
            }
            
            Text(stage.name)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundColor(.primary)
            
            Text(stage.description)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineLimit(2)
            
            HStack(spacing: 4) {
                ForEach(stage.operations, id: \.self) { op in
                    Text(op.rawValue)
                        .font(.caption2)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Color.blue.opacity(0.2))
                        .cornerRadius(4)
                }
            }
        }
        .padding()
        .frame(width: 180, height: 140)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(isSelected ? 
                      Color.blue.opacity(0.1) : Color.gray.opacity(0.1))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(isSelected ? 
                        Color.blue : Color.clear, lineWidth: 2)
        )
        .onTapGesture(perform: onTap)
    }
}

// MARK: - Stage Card with Problem Grid

struct StageCardWithGrid: View {
    let stage: Stage
    let index: Int
    let islandId: Int
    let isSelected: Bool
    let progressTracker: ProgressTracker
    let onTap: () -> Void
    
    @State private var showingGrid = false
    @State private var selectedPracticeMode: String = GameViewModel.PracticeMode.visual.rawValue
    
    var progress: (completed: Int, total: Int) {
        progressTracker.getStageProgress(islandId: islandId, stageIndex: index, practiceMode: selectedPracticeMode)
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text("\(index + 1)")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(width: 24, height: 24)
                    .background(
                        Circle()
                            .fill(isSelected ? Color.blue : Color.gray)
                    )
                
                Spacer()
                
                // Progress indicator
                Text("\(progress.completed)/\(progress.total)")
                    .font(.caption2)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(
                        Capsule()
                            .fill(progress.completed == progress.total ? Color.green : Color.orange)
                    )
            }
            
            Text(stage.name)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundColor(.primary)
            
            Text(stage.description)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineLimit(2)
            
            HStack(spacing: 4) {
                ForEach(stage.operations, id: \.self) { op in
                    Text(op.rawValue)
                        .font(.caption2)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Color.blue.opacity(0.2))
                        .cornerRadius(4)
                }
            }
            
            // Button to show problem grid
            Button(action: {
                showingGrid = true
            }) {
                HStack {
                    Image(systemName: "grid.circle.fill")
                        .font(.caption)
                    Text("View Progress")
                        .font(.caption2)
                        .fontWeight(.semibold)
                }
                .foregroundColor(.blue)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 6)
                .background(
                    RoundedRectangle(cornerRadius: 6)
                        .fill(Color.blue.opacity(0.1))
                )
            }
        }
        .padding()
        .frame(width: 220, height: 180)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(isSelected ? 
                      Color.blue.opacity(0.1) : Color.gray.opacity(0.1))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(isSelected ? 
                        Color.blue : Color.clear, lineWidth: 2)
        )
        .onTapGesture(perform: onTap)
        .sheet(isPresented: $showingGrid) {
            ProblemGridView(
                stage: stage,
                islandId: islandId,
                stageIndex: index,
                progressTracker: progressTracker,
                selectedPracticeMode: $selectedPracticeMode
            )
        }
    }
}

// MARK: - Problem Grid View

struct ProblemGridView: View {
    let stage: Stage
    let islandId: Int
    let stageIndex: Int
    let progressTracker: ProgressTracker
    
    @Binding var selectedPracticeMode: String
    @Environment(\.dismiss) private var dismiss
    
    let columns = Array(repeating: GridItem(.flexible(), spacing: 8), count: 5)
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    // Stage info header
                    VStack(spacing: 8) {
                        Text(stage.name)
                            .font(.title2)
                            .fontWeight(.bold)
                        
                        Text(stage.description)
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        
                        HStack(spacing: 6) {
                            ForEach(stage.operations, id: \.self) { op in
                                Text(op.rawValue)
                                    .font(.caption)
                                    .padding(.horizontal, 10)
                                    .padding(.vertical, 4)
                                    .background(Color.blue.opacity(0.2))
                                    .cornerRadius(6)
                            }
                        }
                    }
                    .padding()
                    
                    // Practice Mode Tabs
                    Picker("Practice Mode", selection: $selectedPracticeMode) {
                        Text("Visual").tag(GameViewModel.PracticeMode.visual.rawValue)
                        Text("Mental").tag(GameViewModel.PracticeMode.mental.rawValue)
                        Text("Finger").tag(GameViewModel.PracticeMode.finger.rawValue)
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal)
                    
                    // 5x5 Problem Grid
                    LazyVGrid(columns: columns, spacing: 12) {
                        ForEach(1...25, id: \.self) { problemNumber in
                            ProblemCell(
                                problemNumber: problemNumber,
                                completion: progressTracker.getProblemCompletion(
                                    islandId: islandId,
                                    stageIndex: stageIndex,
                                    problemNumber: problemNumber,
                                    practiceMode: selectedPracticeMode
                                )
                            )
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Problem Progress")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}

// MARK: - Problem Cell

struct ProblemCell: View {
    let problemNumber: Int
    let completion: ProblemCompletion?
    
    var body: some View {
        VStack(spacing: 4) {
            ZStack {
                Circle()
                    .fill(cellColor)
                    .frame(width: 50, height: 50)
                
                if let completion = completion {
                    if completion.isCorrect {
                        Image(systemName: "checkmark")
                            .font(.title3)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    } else {
                        Image(systemName: "xmark")
                            .font(.title3)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    }
                } else {
                    Text("\(problemNumber)")
                        .font(.headline)
                        .fontWeight(.semibold)
                        .foregroundColor(.primary)
                }
            }
            
            // Date display
            if let completion = completion {
                Text(completion.displayDate)
                    .font(.caption2)
                    .fontWeight(.medium)
                    .foregroundColor(.secondary)
            } else {
                Text("—")
                    .font(.caption2)
                    .foregroundColor(.clear)
            }
        }
    }
    
    var cellColor: Color {
        guard let completion = completion else {
            return Color.gray.opacity(0.2)
        }
        
        return completion.isCorrect ? Color.green.opacity(0.7) : Color.red.opacity(0.7)
    }
}

// MARK: - Start Game Button

struct StartGameButton: View {
    @ObservedObject var gameViewModel: GameViewModel
    
    var body: some View {
        Button(action: {
            gameViewModel.startGame()
        }) {
            HStack {
                Text("Start Game")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                if let stage = gameViewModel.currentStage {
                    Text("• \(stage.name)")
                        .font(.subheadline)
                }
            }
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding()
            .background(Color.green)
            .cornerRadius(12)
        }
        .padding(.horizontal, 40)
        .padding(.top, 10)
    }
}

// MARK: - iPad Version without NavigationView wrapper

struct GameViewiPad: View {
    @StateObject private var gameViewModel: GameViewModel
    @ObservedObject var progressTracker: ProgressTracker
    
    init(progressTracker: ProgressTracker) {
        self.progressTracker = progressTracker
        _gameViewModel = StateObject(wrappedValue: GameViewModel(progressTracker: progressTracker))
    }
    
    var body: some View {
        VStack(spacing: 30) {
            iPadScoreHeader(
                gameViewModel: gameViewModel,
                progressTracker: progressTracker
            )
            
            if gameViewModel.gameState == .playing {
                iPadPlayingStateView(gameViewModel: gameViewModel)
            } else if gameViewModel.gameState == .ready {
                ReadyStateView(gameViewModel: gameViewModel)
            }
            
            Spacer()
        }
        .navigationTitle("Game")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                if gameViewModel.gameState == .playing {
                    Button("New Game") {
                        gameViewModel.resetGame()
                    }
                }
            }
        }
    }
}

// MARK: - iPad Score Header

struct iPadScoreHeader: View {
    @ObservedObject var gameViewModel: GameViewModel
    @ObservedObject var progressTracker: ProgressTracker
    
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text("Island")
                    .font(.caption)
                    .foregroundColor(.secondary)
                if let config = gameViewModel.currentLevelConfig {
                    Text(config.label.replacingOccurrences(of: "Island ", with: ""))
                        .font(.title2)
                        .fontWeight(.bold)
                } else {
                    Text("\(gameViewModel.level)")
                        .font(.title2)
                        .fontWeight(.bold)
                }
            }
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color.blue.opacity(0.1))
            .cornerRadius(10)
            
            VStack(alignment: .leading) {
                Text("Stage")
                    .font(.caption)
                    .foregroundColor(.secondary)
                if let stage = gameViewModel.currentStage {
                    Text(stage.name)
                        .font(.caption)
                        .fontWeight(.bold)
                        .lineLimit(2)
                } else {
                    Text("1")
                        .font(.title2)
                        .fontWeight(.bold)
                }
            }
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color.purple.opacity(0.1))
            .cornerRadius(10)
            
            VStack(alignment: .leading) {
                Text("Score")
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text("\(gameViewModel.score)")
                    .font(.title2)
                    .fontWeight(.bold)
            }
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color.green.opacity(0.1))
            .cornerRadius(10)
            
            if let todayLog = progressTracker.getTodayLog() {
                VStack(alignment: .leading) {
                    Text("Today")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text("\(todayLog.problemsSolved)")
                        .font(.title2)
                        .fontWeight(.bold)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color.orange.opacity(0.1))
                .cornerRadius(10)
            }
        }
        .padding(.horizontal)
    }
}

// MARK: - iPad Playing State View

struct iPadPlayingStateView: View {
    @ObservedObject var gameViewModel: GameViewModel
    
    var body: some View {
        VStack(spacing: 20) {
            iPadModeIndicatorWithProblem(
                practiceMode: gameViewModel.practiceMode,
                problemNumber: gameViewModel.currentProblemNumber
            )
            
            // Question display with audio button
            VStack(spacing: 20) {
                HStack(spacing: 15) {
                    // In mental mode, hide the question text
                    if gameViewModel.practiceMode == .visual || gameViewModel.practiceMode == .finger {
                        Text(gameViewModel.currentQuestion)
                            .font(.system(size: 50, weight: .bold, design: .rounded))
                            .foregroundColor(.primary)
                    } else {
                        VStack(spacing: 8) {
                            Image(systemName: "ear.fill")
                                .font(.system(size: 60))
                                .foregroundColor(.purple)
                            Text("Listen & Solve")
                                .font(.largeTitle)
                                .fontWeight(.bold)
                                .foregroundColor(.purple)
                            Text("Question will be read aloud")
                                .font(.title3)
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    Button(action: {
                        gameViewModel.announceQuestion()
                    }) {
                        Image(systemName: "speaker.wave.2.fill")
                            .font(.largeTitle)
                            .foregroundColor(gameViewModel.modeColor)
                            .padding(16)
                            .background(gameViewModel.modeColor.opacity(0.1))
                            .cornerRadius(12)
                    }
                }
                
                if gameViewModel.practiceMode == .visual || gameViewModel.practiceMode == .finger {
                    Text("= ?")
                        .font(.system(size: 50, weight: .bold, design: .rounded))
                        .foregroundColor(.pink)
                }
            }
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color(.systemBackground))
            .cornerRadius(15)
            .shadow(radius: 5)
            .padding(.horizontal)
            
            // Interactive Abacus or Finger Theory display
            if gameViewModel.practiceMode == .visual || gameViewModel.practiceMode == .finger {
                VStack(spacing: 10) {
                    if gameViewModel.practiceMode == .finger {
                        // Finger theory mode - show visual hint
                        HStack(spacing: 15) {
                            Image(systemName: "hand.raised.fill")
                                .font(.system(size: 80))
                                .foregroundColor(.orange.opacity(0.3))
                            
                            VStack(alignment: .leading, spacing: 8) {
                                Text("Finger Theory Mode")
                                    .font(.largeTitle)
                                    .fontWeight(.bold)
                                    .foregroundColor(.orange)
                                
                                Text("Numbers < 100")
                                    .font(.title2)
                                    .foregroundColor(.secondary)
                                
                                Text("Use your fingers to visualize!")
                                    .font(.title3)
                                    .foregroundColor(.secondary)
                            }
                        }
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 15)
                                .fill(Color.orange.opacity(0.1))
                        )
                    }
                    
                    InteractiveAbacusView(viewModel: gameViewModel.abacusViewModel)
                        .frame(height: 400)
                }
                .padding(.horizontal)
            } else {
                // Mental mode - show a brain animation or placeholder
                VStack(spacing: 20) {
                    Image(systemName: "brain.head.profile")
                        .font(.system(size: 120))
                        .foregroundColor(.purple.opacity(0.3))
                    
                    Text("Use your mental abacus")
                        .font(.title)
                        .fontWeight(.semibold)
                        .foregroundColor(.purple.opacity(0.6))
                }
                .frame(height: 400)
                .padding(.horizontal)
            }
            
            // Answer input text field
            VStack(spacing: 15) {
                if gameViewModel.practiceMode == .mental || gameViewModel.practiceMode == .finger {
                    // Mental/Finger mode: user types directly
                    TextField("Type your answer", text: $gameViewModel.userAnswer)
                        .font(.system(size: 40, weight: .bold, design: .rounded))
                        .multilineTextAlignment(.center)
                        .padding()
                        .background(
                            RoundedRectangle(cornerRadius: 15)
                                .fill(gameViewModel.feedbackColor.opacity(0.1))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 15)
                                .stroke(gameViewModel.feedbackColor, lineWidth: 3)
                        )
                        .padding(.horizontal)
                        .keyboardType(.decimalPad)
                        .onSubmit {
                            gameViewModel.checkAnswer()
                        }
                } else {
                    // Visual mode: abacus controls input
                    Text(gameViewModel.userAnswer.isEmpty ? "Use abacus to answer" : gameViewModel.userAnswer)
                        .font(.system(size: 40, weight: .bold, design: .rounded))
                        .multilineTextAlignment(.center)
                        .foregroundColor(gameViewModel.userAnswer.isEmpty ? .secondary : .primary)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(
                            RoundedRectangle(cornerRadius: 15)
                                .fill(gameViewModel.feedbackColor.opacity(0.1))
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 15)
                                .stroke(gameViewModel.feedbackColor, lineWidth: 3)
                        )
                        .padding(.horizontal)
                }
                
                Button(action: {
                    gameViewModel.checkAnswer()
                }) {
                    HStack {
                        Text(gameViewModel.feedback == nil ? "Check Answer" : "Next Question")
                            .font(.title)
                            .fontWeight(.bold)
                        Image(systemName: gameViewModel.feedback == nil ? "checkmark.circle.fill" : "arrow.right.circle.fill")
                            .font(.title)
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(
                        gameViewModel.lastAnswerCorrect && gameViewModel.feedback != nil ?
                        Color.green : gameViewModel.modeColor
                    )
                    .cornerRadius(12)
                }
                .padding(.horizontal)
            }
            
            // Feedback
            if let feedback = gameViewModel.feedback {
                HStack(spacing: 10) {
                    Image(systemName: gameViewModel.lastAnswerCorrect ? "checkmark.circle.fill" : "xmark.circle.fill")
                        .font(.largeTitle)
                    Text(feedback)
                        .font(.title2)
                }
                .foregroundColor(gameViewModel.lastAnswerCorrect ? .green : .red)
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(gameViewModel.lastAnswerCorrect ? Color.green.opacity(0.1) : Color.red.opacity(0.1))
                )
                .transition(.scale.combined(with: .opacity))
            }
        }
    }
}

// MARK: - iPad Mode Indicator

struct iPadModeIndicator: View {
    let practiceMode: GameViewModel.PracticeMode
    
    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: practiceMode.icon)
                .font(.caption)
            Text(practiceMode.displayName)
                .font(.caption)
                .fontWeight(.bold)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
        .background(
            Capsule()
                .fill(practiceMode.color.opacity(0.1))
        )
        .overlay(
            Capsule()
                .stroke(practiceMode.color, lineWidth: 1.5)
        )
        .foregroundColor(practiceMode.color)
    }
}

struct iPadModeIndicatorWithProblem: View {
    let practiceMode: GameViewModel.PracticeMode
    let problemNumber: Int
    
    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: practiceMode.icon)
                .font(.caption)
            Text(practiceMode.displayName)
                .font(.caption)
                .fontWeight(.bold)
            
            Text("•")
                .font(.caption)
            Text("Problem \(problemNumber)")
                .font(.caption)
                .fontWeight(.bold)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
        .background(
            Capsule()
                .fill(practiceMode.color.opacity(0.1))
        )
        .overlay(
            Capsule()
                .stroke(practiceMode.color, lineWidth: 1.5)
        )
        .foregroundColor(practiceMode.color)
    }
}

#Preview {
    GameView()
}

