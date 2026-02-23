//
//  AbacusViewModel.swift
//  Abacus
//
//  Created by Devaraj N Subramanian on 23/02/26.
//

import Foundation
import SwiftUI
import Combine

class AbacusViewModel: ObservableObject {
    @Published var columns: [AbacusColumn]
    
    init(numberOfColumns: Int = 10) {
        self.columns = (0..<numberOfColumns).map { position in
            AbacusColumn(position: position)
        }
    }
    
    var currentValue: Int {
        var total = 0
        for (index, column) in columns.enumerated() {
            let placeValue = Int(pow(10.0, Double(index)))
            total += column.value * placeValue
        }
        return total
    }
    
    func reset() {
        for index in columns.indices {
            columns[index].reset()
        }
    }
    
    func setValue(_ value: Int) {
        reset()
        var remaining = value
        
        for index in columns.indices {
            let digit = remaining % 10
            columns[index].setValue(digit)
            remaining /= 10
        }
    }
    
    func toggleUpperBead(at columnIndex: Int) {
        guard columnIndex < columns.count else { return }
        columns[columnIndex].toggleUpperBead()
    }
    
    func toggleLowerBead(at columnIndex: Int, beadIndex: Int) {
        guard columnIndex < columns.count else { return }
        columns[columnIndex].toggleLowerBead(at: beadIndex)
    }
}

struct AbacusColumn: Identifiable {
    let id = UUID()
    let position: Int
    var upperBeadActive: Bool = false
    var lowerBeadsActive: [Bool] = [false, false, false, false]
    
    var value: Int {
        let upperValue = upperBeadActive ? 5 : 0
        let lowerValue = lowerBeadsActive.filter { $0 }.count
        return upperValue + lowerValue
    }
    
    mutating func reset() {
        upperBeadActive = false
        lowerBeadsActive = [false, false, false, false]
    }
    
    mutating func setValue(_ digit: Int) {
        reset()
        if digit >= 5 {
            upperBeadActive = true
            let remainder = digit - 5
            for i in 0..<remainder {
                lowerBeadsActive[i] = true
            }
        } else {
            for i in 0..<digit {
                lowerBeadsActive[i] = true
            }
        }
    }
    
    mutating func toggleUpperBead() {
        upperBeadActive.toggle()
    }
    
    mutating func toggleLowerBead(at index: Int) {
        guard index < lowerBeadsActive.count else { return }
        
        // When toggling a lower bead, activate/deactivate all beads up to this one
        if lowerBeadsActive[index] {
            // Deactivating - turn off this bead and all above it
            for i in index..<lowerBeadsActive.count {
                lowerBeadsActive[i] = false
            }
        } else {
            // Activating - turn on all beads up to and including this one
            for i in 0...index {
                lowerBeadsActive[i] = true
            }
        }
    }
}
