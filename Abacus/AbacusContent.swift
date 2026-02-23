//
//  AbacusContent.swift
//  Abacus
//
//  Created by Devaraj N Subramanian on 23/02/26.
//

import Foundation

enum AbacusContent {
    enum Navigation {
        static let practice = "Practice"
        static let game = "Game"
        static let learn = "Learn"
    }
    
    enum Learning {
        static let title = "Learn Abacus"
        
        struct Tutorial {
            let title: String
            let description: String
            let steps: [String]
        }
        
        static let tutorialList: [Tutorial] = [
            Tutorial(
                title: "Introduction to Abacus",
                description: "Learn the basics of the abacus and how to read numbers.",
                steps: [
                    "The abacus consists of rods with beads that slide up and down.",
                    "Each rod represents a place value (ones, tens, hundreds, etc.).",
                    "The upper bead (red) represents 5 when moved down to the center bar.",
                    "Each lower bead (blue) represents 1 when moved up to the center bar.",
                    "The center bar is called the 'counting bar' - beads touching it are active.",
                    "Read the abacus from left to right, just like regular numbers."
                ]
            ),
            Tutorial(
                title: "Reading Numbers",
                description: "Understand how to read values displayed on the abacus.",
                steps: [
                    "Start from the rightmost column - this is the ones place.",
                    "Count the beads touching the center bar in each column.",
                    "If the upper bead is touching the bar, add 5 to that column's value.",
                    "For each lower bead touching the bar, add 1 to that column's value.",
                    "Move to the next column on the left and multiply by 10.",
                    "Add up all the values to get the total number."
                ]
            ),
            Tutorial(
                title: "Setting Numbers",
                description: "Learn how to represent any number on the abacus.",
                steps: [
                    "Break down the number by place value (ones, tens, hundreds, etc.).",
                    "Start with the rightmost column for the ones place.",
                    "For values 5-9, move the upper bead down to the bar.",
                    "Add lower beads as needed (0-4 additional value).",
                    "Move to the next column for tens, hundreds, and so on.",
                    "Practice with different numbers to build muscle memory."
                ]
            ),
            Tutorial(
                title: "Basic Addition",
                description: "Master the technique of adding numbers using the abacus.",
                steps: [
                    "Set the first number on the abacus.",
                    "Add the second number column by column, starting from the right.",
                    "If adding beads would exceed 9 in a column, carry over to the next column.",
                    "When the upper bead is down and you have 4 lower beads up, that's 9.",
                    "Adding 1 more means clearing that column and adding 1 to the next column.",
                    "Practice with simple additions like 23 + 45 before moving to harder problems."
                ]
            ),
            Tutorial(
                title: "Basic Subtraction",
                description: "Learn how to subtract numbers on the abacus.",
                steps: [
                    "Set the larger number (minuend) on the abacus.",
                    "Subtract the second number column by column from right to left.",
                    "If you need to subtract more than what's available, borrow from the next column.",
                    "Borrowing means taking 10 from the left column to add to the current column.",
                    "Remove the appropriate beads to complete the subtraction.",
                    "The remaining beads show your answer."
                ]
            ),
            Tutorial(
                title: "Advanced Techniques",
                description: "Explore advanced calculation methods and speed techniques.",
                steps: [
                    "Practice the 'friends of 5' method: pairs that add up to 5 (1+4, 2+3).",
                    "Learn 'friends of 10': pairs that add up to 10 (1+9, 2+8, etc.).",
                    "Use complementary numbers for faster mental calculation.",
                    "Practice speed drills to increase your calculation rate.",
                    "Try multiplying by setting the multiplicand and adding repeatedly.",
                    "With practice, you can perform complex calculations mentally by visualizing the abacus."
                ]
            )
        ]
    }
}
