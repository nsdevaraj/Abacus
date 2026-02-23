//
//  ContentView.swift
//  Abacus
//
//  Created by Devaraj N Subramanian on 23/02/26.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = AbacusViewModel(numberOfColumns: 10)
    @State private var inputValue: String = ""
    @State private var showingInput: Bool = false
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    
    var body: some View {
        if horizontalSizeClass == .regular {
            // iPad: Full width layout without NavigationView wrapper
            iPadContentView(
                viewModel: viewModel,
                inputValue: $inputValue,
                showingInput: $showingInput,
                placeValueName: placeValueName
            )
        } else {
            // iPhone: Original layout with NavigationView
            NavigationView {
                iPhoneContentView(
                    viewModel: viewModel,
                    inputValue: $inputValue,
                    showingInput: $showingInput,
                    placeValueName: placeValueName
                )
            }
        }
    }
    
    private func placeValueName(for position: Int) -> String {
        switch position {
        case 0: return "1s"
        case 1: return "10s"
        case 2: return "100s"
        case 3: return "1K"
        case 4: return "10K"
        case 5: return "100K"
        case 6: return "1M"
        case 7: return "10M"
        case 8: return "100M"
        case 9: return "1B"
        default: return "\(Int(pow(10.0, Double(position))))"
        }
    }
}

// MARK: - iPad Content View

struct iPadContentView: View {
    @ObservedObject var viewModel: AbacusViewModel
    @Binding var inputValue: String
    @Binding var showingInput: Bool
    let placeValueName: (Int) -> String
    
    var body: some View {
        ScrollView {
            VStack(spacing: 40) {
                // Header with current value
                VStack(spacing: 16) {
                    HStack {
                        Image(systemName: "number.circle.fill")
                            .font(.largeTitle)
                            .foregroundColor(.blue)
                        Text("Current Value")
                            .font(.title2)
                            .fontWeight(.semibold)
                    }
                    
                    Text("\(viewModel.currentValue)")
                        .font(.system(size: 72, weight: .bold, design: .rounded))
                        .foregroundColor(.primary)
                        .padding(.horizontal, 40)
                        .padding(.vertical, 30)
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 20)
                                .fill(
                                    LinearGradient(
                                        colors: [Color.blue.opacity(0.1), Color.purple.opacity(0.1)],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                        )
                        .overlay(
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(Color.blue.opacity(0.3), lineWidth: 2)
                        )
                        .shadow(color: .blue.opacity(0.1), radius: 10, x: 0, y: 5)
                }
                .padding(.horizontal, 48)
                .padding(.top, 20)
                
                // Interactive Abacus
                VStack(spacing: 20) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 20)
                            .fill(
                                LinearGradient(
                                    colors: [Color.brown.opacity(0.2), Color.orange.opacity(0.15)],
                                    startPoint: .top,
                                    endPoint: .bottom
                                )
                            )
                            .shadow(color: .black.opacity(0.15), radius: 10, x: 0, y: 5)
                        
                        VStack(spacing: 0) {
                            // Upper section (heaven beads - value 5 each)
                            HStack(spacing: 8) {
                                ForEach(Array(viewModel.columns.enumerated().reversed()), id: \.element.id) { index, column in
                                    AbacusColumnView(
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
                            .padding(.vertical, 24)
                            .padding(.horizontal, 16)
                        }
                    }
                    .padding(.horizontal, 48)
                    
                    // Place value indicators
                    HStack(spacing: 8) {
                        ForEach((0..<10).reversed(), id: \.self) { index in
                            Text(placeValueName(index))
                                .font(.caption)
                                .fontWeight(.medium)
                                .foregroundColor(.secondary)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 6)
                                .background(
                                    RoundedRectangle(cornerRadius: 6)
                                        .fill(Color(.systemGray6))
                                )
                        }
                    }
                    .padding(.horizontal, 52)
                }
                
                // Action buttons
                HStack(spacing: 20) {
                    Button(action: {
                        withAnimation(.spring()) {
                            viewModel.reset()
                        }
                    }) {
                        HStack {
                            Image(systemName: "arrow.counterclockwise")
                                .font(.title3)
                            Text("Reset")
                                .font(.headline)
                        }
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 20)
                        .background(
                            LinearGradient(
                                colors: [Color.red, Color.red.opacity(0.8)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .cornerRadius(15)
                        .shadow(color: .red.opacity(0.3), radius: 5, x: 0, y: 3)
                    }
                    
                    Button(action: {
                        showingInput = true
                    }) {
                        HStack {
                            Image(systemName: "keyboard")
                                .font(.title3)
                            Text("Set Value")
                                .font(.headline)
                        }
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 20)
                        .background(
                            LinearGradient(
                                colors: [Color.blue, Color.blue.opacity(0.8)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .cornerRadius(15)
                        .shadow(color: .blue.opacity(0.3), radius: 5, x: 0, y: 3)
                    }
                }
                .padding(.horizontal, 48)
                .padding(.bottom, 40)
            }
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle("Abacus Practice")
        .navigationBarTitleDisplayMode(.large)
        .sheet(isPresented: $showingInput) {
            InputValueView(
                inputValue: $inputValue,
                isPresented: $showingInput,
                onSubmit: {
                    if let value = Int(inputValue) {
                        withAnimation(.spring()) {
                            viewModel.setValue(value)
                        }
                        inputValue = ""
                        showingInput = false
                    }
                }
            )
        }
    }
}

// MARK: - iPhone Content View

struct iPhoneContentView: View {
    @ObservedObject var viewModel: AbacusViewModel
    @Binding var inputValue: String
    @Binding var showingInput: Bool
    let placeValueName: (Int) -> String
    
    var body: some View {
        VStack(spacing: 20) {
            // Display current value
            VStack(spacing: 8) {
                Text("Current Value")
                    .font(.headline)
                    .foregroundColor(.secondary)
                
                Text("\(viewModel.currentValue)")
                    .font(.system(size: 48, weight: .bold, design: .rounded))
                    .foregroundColor(.primary)
            }
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color(.systemBackground))
            .cornerRadius(12)
            .shadow(radius: 2)
            .padding(.horizontal)
            
            // Abacus frame
            ZStack {
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.brown.opacity(0.3))
                    .shadow(radius: 5)
                
                VStack(spacing: 0) {
                    // Upper section (heaven beads - value 5 each)
                    HStack(spacing: 0) {
                        ForEach(Array(viewModel.columns.enumerated().reversed()), id: \.element.id) { index, column in
                            AbacusColumnView(
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
                    .padding(.vertical, 16)
                }
                .padding(.horizontal, 8)
            }
            .padding()
            
            // Place value indicators
            HStack(spacing: 0) {
                ForEach((0..<10).reversed(), id: \.self) { index in
                    Text(placeValueName(index))
                        .font(.caption2)
                        .foregroundColor(.secondary)
                        .frame(maxWidth: .infinity)
                }
            }
            .padding(.horizontal, 24)
            
            Spacer()
        }
        .navigationTitle("Abacus")
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button("Reset") {
                    withAnimation(.spring()) {
                        viewModel.reset()
                    }
                }
            }
            
            ToolbarItem(placement: .navigationBarTrailing) {
                Button("Set Value") {
                    showingInput = true
                }
            }
        }
        .sheet(isPresented: $showingInput) {
            InputValueView(
                inputValue: $inputValue,
                isPresented: $showingInput,
                onSubmit: {
                    if let value = Int(inputValue) {
                        withAnimation(.spring()) {
                            viewModel.setValue(value)
                        }
                        inputValue = ""
                        showingInput = false
                    }
                }
            )
        }
    }
}

struct AbacusColumnView: View {
    let column: AbacusColumn
    let columnIndex: Int
    let onUpperBeadTap: () -> Void
    let onLowerBeadTap: (Int) -> Void
    
    var body: some View {
        VStack(spacing: 0) {
            // Upper bead (heaven - value 5)
            VStack(spacing: 4) {
                Spacer()
                    .frame(height: 20)
                
                BeadView(isActive: column.upperBeadActive, color: .red)
                    .onTapGesture {
                        withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                            onUpperBeadTap()
                        }
                    }
                
                Spacer()
                    .frame(height: 8)
            }
            .frame(height: 80)
            
            // Middle bar (divider)
            Rectangle()
                .fill(Color.brown)
                .frame(height: 4)
                .padding(.horizontal, -8)
            
            // Lower beads (earth - value 1 each)
            VStack(spacing: 4) {
                Spacer()
                    .frame(height: 8)
                
                ForEach(0..<4, id: \.self) { beadIndex in
                    BeadView(isActive: column.lowerBeadsActive[beadIndex], color: .blue)
                        .onTapGesture {
                            withAnimation(.spring(response: 0.3, dampingFraction: 0.6)) {
                                onLowerBeadTap(beadIndex)
                            }
                        }
                }
                
                Spacer()
                    .frame(height: 20)
            }
            .frame(height: 160)
        }
        .background(
            Rectangle()
                .fill(Color.brown.opacity(0.4))
                .frame(width: 3)
        )
    }
}

struct BeadView: View {
    let isActive: Bool
    let color: Color
    
    var body: some View {
        Circle()
            .fill(
                LinearGradient(
                    gradient: Gradient(colors: [
                        color.opacity(isActive ? 1 : 0.4),
                        color.opacity(isActive ? 0.7 : 0.3)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .overlay(
                Circle()
                    .stroke(Color.white.opacity(0.3), lineWidth: 1)
            )
            .frame(width: 24, height: 24)
            .shadow(color: isActive ? color.opacity(0.5) : .clear, radius: 4)
    }
}

struct InputValueView: View {
    @Binding var inputValue: String
    @Binding var isPresented: Bool
    let onSubmit: () -> Void
    @FocusState private var isFocused: Bool
    
    var body: some View {
        NavigationView {
            Form {
                Section {
                    TextField("Enter number", text: $inputValue)
                        .keyboardType(.numberPad)
                        .focused($isFocused)
                        .font(.title2)
                } header: {
                    Text("Set Abacus Value")
                } footer: {
                    Text("Enter a number to set the abacus beads")
                }
            }
            .navigationTitle("Input Value")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        isPresented = false
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Set") {
                        onSubmit()
                    }
                    .disabled(inputValue.isEmpty || Int(inputValue) == nil)
                }
            }
            .onAppear {
                isFocused = true
            }
        }
    }
}

#Preview {
    ContentView()
}
