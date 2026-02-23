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
    
    var body: some View {
        NavigationView {
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
                        Text(placeValueName(for: index))
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
