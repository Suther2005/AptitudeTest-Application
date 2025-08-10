import mongoose from "mongoose";
import Question from "./models/Question.js";

mongoose.connect("mongodb://127.0.0.1:27017/quizDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const questions = [
  { question: "What is 15% of 200?", options: ["20", "25", "30", "35"], correctAnswer: "30", difficulty: "easy" },
  { question: "The LCM of 6 and 8 is:", options: ["12", "24", "48", "6"], correctAnswer: "24", difficulty: "easy" },
  { question: "A train travels 120 km in 2 hours. What is its speed?", options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"], correctAnswer: "60 km/h", difficulty: "easy" },
  { question: "Find the missing number: 5, 10, 15, __, 25", options: ["18", "20", "22", "24"], correctAnswer: "20", difficulty: "easy" },
  { question: "A shopkeeper buys a pen for ₹40 and sells it for ₹50. What is the profit percentage?", options: ["10%", "20%", "25%", "50%"], correctAnswer: "25%", difficulty: "easy" },
  { question: "If A = 8 and B = 5, what is A × B?", options: ["30", "35", "40", "45"], correctAnswer: "40", difficulty: "easy" },
  { question: "A father is 30 years older than his son. If the son's age is 10 years, how old is the father?", options: ["30", "35", "40", "50"], correctAnswer: "40", difficulty: "easy" },
  { question: "A car consumes 5 liters of fuel for 50 km. How much fuel is needed for 100 km?", options: ["5L", "10L", "8L", "12L"], correctAnswer: "10L", difficulty: "easy" },
  { question: "The area of a square with a side of 4 cm is:", options: ["8 cm²", "12 cm²", "16 cm²", "20 cm²"], correctAnswer: "16 cm²", difficulty: "easy" },
  { question: "What is 10 ÷ 2 × 4?", options: ["5", "10", "20", "40"], correctAnswer: "20", difficulty: "easy" },

  { question: "If A = 1, B = 2, C = 3, what is E + F?", options: ["9", "10", "11", "12"], correctAnswer: "11", difficulty: "easy" },
  { question: "Find the odd one out: Apple, Banana, Carrot, Mango", options: ["Apple", "Banana", "Carrot", "Mango"], correctAnswer: "Carrot", difficulty: "easy" },
  { question: "If CAT = 3120, then what is DOG?", options: ["4156", "4157", "4130", "4160"], correctAnswer: "4156", difficulty: "easy" },
  { question: "What comes next? 2, 4, 6, 8, __", options: ["10", "12", "14", "16"], correctAnswer: "10", difficulty: "easy" },
  { question: "John is taller than Peter. Peter is shorter than Alex. Who is the tallest?", options: ["John", "Peter", "Alex", "Cannot be determined"], correctAnswer: "Alex", difficulty: "easy" },
  { question: "If MONDAY is coded as NPOEBZ, what is FRIDAY?", options: ["GJEBZ", "GSJEBZ", "GJECZ", "GSJFCZ"], correctAnswer: "GSJEBZ", difficulty: "easy" },
  { question: "A clock shows 3:15 PM. What is the angle between the hour and minute hand?", options: ["30°", "37.5°", "45°", "52.5°"], correctAnswer: "37.5°", difficulty: "easy" },
  { question: "Find the missing number: 3, 6, 9, __, 15", options: ["10", "11", "12", "13"], correctAnswer: "12", difficulty: "easy" },
  { question: "If 2 → 4, 3 → 9, 4 → 16, then 5 → ?", options: ["20", "24", "25", "30"], correctAnswer: "25", difficulty: "easy" },
  { question: "Identify the pattern: AB, BC, CD, __, EF", options: ["DE", "DG", "ED", "CF"], correctAnswer: "DE", difficulty: "easy" },

  { question: "Choose the synonym of Happy:", options: ["Sad", "Angry", "Joyful", "Worried"], correctAnswer: "Joyful", difficulty: "easy" },
  { question: "Choose the antonym of Brave:", options: ["Fearless", "Cowardly", "Bold", "Confident"], correctAnswer: "Cowardly", difficulty: "easy" },
  { question: "Fill in the blank: She ___ playing football.", options: ["am", "is", "are", "were"], correctAnswer: "is", difficulty: "easy" },
  { question: "Identify the correct sentence:", options: ["He go to school.", "He went to school.", "He going to school.", "He goes to school."], correctAnswer: "He goes to school.", difficulty: "easy" },
  { question: "Rearrange: dog / is / the / playing.", options: ["Is playing the dog.", "The dog is playing.", "Playing is the dog.", "Dog is the playing."], correctAnswer: "The dog is playing.", difficulty: "easy" },
  { question: "Choose the correctly spelled word:", options: ["Accomodation", "Accommedation", "Accommodation", "Acommodation"], correctAnswer: "Accommodation", difficulty: "easy" },
  { question: "Fill in the blank: The Sun ___ in the east.", options: ["rise", "rises", "rising", "risen"], correctAnswer: "rises", difficulty: "easy" },
  { question: "Identify the odd word: Apple, Orange, Mango, Carrot", options: ["Apple", "Orange", "Mango", "Carrot"], correctAnswer: "Carrot", difficulty: "easy" },
  { question: "Find the opposite of Ancient:", options: ["Old", "New", "Young", "Traditional"], correctAnswer: "New", difficulty: "easy" },
  { question: "Choose the correct article: He is ___ honest man.", options: ["a", "an", "the", "no article"], correctAnswer: "an", difficulty: "easy" },
   {
    question: "A person sold a watch for ₹8400 at a loss of 16%. What was the cost price?",
    options: ["₹9500", "₹9600", "₹10,000", "₹10,200"],
    correctAnswer: "₹10,000",
    difficulty: "hard",
  },
  {
    question: "The sum of three consecutive odd numbers is 147. What is the largest number?",
    options: ["47", "49", "51", "53"],
    correctAnswer: "51",
    difficulty: "hard",
  },
  {
    question: "If a+b = 12 and ab = 32, find the value of a² + b².",
    options: ["80", "82", "84", "86"],
    correctAnswer: "80",
    difficulty: "hard",
  },
  {
    question: "A boat can travel 24 km upstream in 4 hours and the same distance downstream in 2 hours. Find the speed of the boat in still water.",
    options: ["6 km/h", "8 km/h", "10 km/h", "12 km/h"],
    correctAnswer: "8 km/h",
    difficulty: "hard",
  },
  {
    question: "If the average of 10 numbers is 45 and the average of the first 6 numbers is 40, what is the average of the last 4 numbers?",
    options: ["47.5", "50", "52.5", "55"],
    correctAnswer: "52.5",
    difficulty: "hard",
  },
  {
    question: "The speed of a train is 20 m/s. It crosses a 500m long bridge in 40 seconds. What is the length of the train?",
    options: ["200m", "250m", "300m", "350m"],
    correctAnswer: "300m",
    difficulty: "hard",
  },
  {
    question: "A trader gives 20% discount on a product but still makes a 25% profit. What is the markup percentage on the cost price?",
    options: ["50%", "56.25%", "62.5%", "75%"],
    correctAnswer: "56.25%",
    difficulty: "hard",
  },
  {
    question: "Two pipes A and B can fill a tank in 12 minutes and 15 minutes respectively, but pipe C can empty the tank in 10 minutes. If all three pipes are opened together, how long will it take to fill the tank?",
    options: ["20 min", "24 min", "30 min", "36 min"],
    correctAnswer: "30 min",
    difficulty: "hard",
  },
  {
    question: "The difference between the simple interest and compound interest on ₹12,000 at 10% per annum for 2 years is:",
    options: ["₹100", "₹120", "₹125", "₹150"],
    correctAnswer: "₹120",
    difficulty: "hard",
  },
  {
    question: "A train 240 meters long passes a pole in 12 seconds. What is the speed of the train in km/h?",
    options: ["60 km/h", "72 km/h", "90 km/h", "100 km/h"],
    correctAnswer: "72 km/h",
    difficulty: "hard",
  },
  {
    question: "If x + 1/x = 3, find the value of x³ + 1/x³.",
    options: ["18", "24", "27", "30"],
    correctAnswer: "27",
    difficulty: "hard",
  },
  {
    question: "A sum of money doubles itself in 8 years at simple interest. What is the annual rate of interest?",
    options: ["10%", "12.5%", "15%", "20%"],
    correctAnswer: "12.5%",
    difficulty: "hard",
  },
  {
    question: "The ratio of the present ages of A and B is 5:7. After 6 years, the ratio becomes 3:4. What is the present age of A?",
    options: ["30", "35", "40", "42"],
    correctAnswer: "30",
    difficulty: "hard",
  },
  {
    question: "Find the missing number in the series: 3, 9, 27, 81, ?",
    options: ["162", "243", "324", "729"],
    correctAnswer: "243",
    difficulty: "hard",
  },
  {
    question: "Pointing to a photograph, A says, 'She is the mother of my father’s only granddaughter.' How is the lady related to A?",
    options: ["Mother", "Sister", "Wife", "Daughter-in-law"],
    correctAnswer: "Wife",
    difficulty: "hard",
  },
  {
    question: "A, B, C, D, and E are arranged in a circular manner. C is between A and E. B is to the immediate right of A. Who is sitting to the left of C?",
    options: ["A", "B", "D", "E"],
    correctAnswer: "E",
    difficulty: "hard",
  },
  {
    question: "Find the missing number: 2, 6, 12, 20, ?",
    options: ["30", "32", "36", "42"],
    correctAnswer: "30",
    difficulty: "hard",
  },
  {
    question: "Choose the correct word: 'The manager was so _______ that he refused to listen to his employees.'",
    options: ["obstinate", "obedient", "considerate", "submissive"],
    correctAnswer: "obstinate",
    difficulty: "hard",
  },
  {
    question: "Find the synonym of 'Adversity'",
    options: ["Misfortune", "Success", "Happiness", "Advantage"],
    correctAnswer: "Misfortune",
    difficulty: "hard",
  },
  {
    question: "A company's profit increased from ₹4,00,000 in 2020 to ₹6,00,000 in 2023. What is the percentage increase?",
    options: ["25%", "33.33%", "40%", "50%"],
    correctAnswer: "50%",
    difficulty: "hard",
  },
  {
    question: "If a bar graph shows the number of students opting for Science, Commerce, and Arts as 150, 120, and 90 respectively, what percentage of students chose Science?",
    options: ["30%", "35%", "40%", "45%"],
    correctAnswer: "40%",
    difficulty: "hard",
  },
  {
    question: "What is the angle between the hour and minute hands at 3:15?",
    options: ["37.5°", "45°", "52.5°", "67.5°"],
    correctAnswer: "52.5°",
    difficulty: "hard",
  },
  {
    question: "If in a certain code 'MANGO' is written as 'LZMFN', how is 'ORANGE' written in that code?",
    options: ["NQZMFD", "NQZMFE", "MPYLMD", "NPYLMD"],
    correctAnswer: "NQZMFE",
    difficulty: "hard",
  },
  {
    question: "The pie chart shows the revenue distribution of a company. If the total revenue is ₹10,00,000 and the IT department contributes 25%, what is the amount?",
    options: ["₹2,00,000", "₹2,50,000", "₹3,00,000", "₹4,00,000"],
    correctAnswer: "₹2,50,000",
    difficulty: "hard",
  },
  {
    question: "If 7th August 2003 was a Thursday, what day of the week was 7th August 2004?",
    options: ["Friday", "Saturday", "Sunday", "Monday"],
    correctAnswer: "Saturday",
    difficulty: "hard",
  },
  {
    question: "If a train is moving at 90 km/h, how long will it take to cover 270 km?",
    options: ["2 hours", "2.5 hours", "3 hours", "3.5 hours"],
    correctAnswer: "3 hours",
    difficulty: "hard",
  },
  {
    question: "The perimeter of a rectangular field is 240 meters, and its length is 10 meters more than twice its breadth. Find its area.",
    options: ["2600 m²", "2800 m²", "3000 m²", "3200 m²"],
    correctAnswer: "3000 m²",
    difficulty: "hard",
  },
  {
    question: "If a man can row 18 km downstream in 3 hours and 12 km upstream in 4 hours, find the speed of the stream.",
    options: ["2 km/h", "2.5 km/h", "3 km/h", "4 km/h"],
    correctAnswer: "2 km/h",
    difficulty: "hard",
  },
  {
    question: "If 5 men can complete a work in 12 days, how many men are required to complete the work in 4 days?",
    options: ["10", "12", "15", "18"],
    correctAnswer: "15",
    difficulty: "hard",
  },
  {
    question: "If a line graph shows an increase in temperature from 25°C to 40°C over 5 days, what is the average temperature change per day?",
    options: ["3°C", "4°C", "5°C", "6°C"],
    correctAnswer: "3°C",
    difficulty: "hard",
  },
   {
    question: "A sum of money doubles itself in 5 years at simple interest. In how many years will it become four times?",
    options: ["10", "15", "20", "25"],
    correctAnswer: "15",
    difficulty: "hard",
  },
  {
    question: "A shopkeeper gives two successive discounts of 20% and 10%. What is the effective discount?",
    options: ["28%", "30%", "32%", "25%"],
    correctAnswer: "28%",
    difficulty: "hard",
  },
  {
    question: "A train 150m long crosses a pole in 9 seconds. What is its speed in km/h?",
    options: ["50", "54", "60", "66"],
    correctAnswer: "60",
    difficulty: "hard",
  },
  {
    question: "The average of 8 consecutive even numbers is 52. Find the largest number.",
    options: ["58", "60", "62", "64"],
    correctAnswer: "60",
    difficulty: "hard",
  },
  {
    question: "A can complete a work in 15 days, while B can do the same work in 10 days. If they work together, how many days will it take?",
    options: ["5", "6", "8", "9"],
    correctAnswer: "6",
    difficulty: "hard",
  },
  {
    question: "What is the remainder when 5⁴⁵ is divided by 7?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "4",
    difficulty: "hard",
  },
  {
    question: "A student gets 40% marks and fails by 20 marks. The pass mark is 50%. What is the maximum mark?",
    options: ["200", "250", "300", "350"],
    correctAnswer: "200",
    difficulty: "hard",
  },
  {
    question: "A bag contains 5 red, 4 blue, and 3 green balls. One ball is drawn at random. What is the probability of drawing a blue ball?",
    options: ["1/3", "2/3", "1/4", "1/2"],
    correctAnswer: "1/3",
    difficulty: "hard",
  },
  {
    question: "If the ratio of ages of A and B is 5:3 and A is 10 years older than B, what is B’s age?",
    options: ["10", "12", "15", "18"],
    correctAnswer: "15",
    difficulty: "hard",
  },
  {
    question: "A clock shows 4:10. What is the angle between the hour and minute hands?",
    options: ["30°", "35°", "40°", "45°"],
    correctAnswer: "35°",
    difficulty: "hard",
  },
  {
    question: "A can complete a work in 24 days, B in 16 days. If they work together for 4 days, how much work is left?",
    options: ["1/4", "1/3", "1/2", "2/3"],
    correctAnswer: "1/2",
    difficulty: "hard",
  },
  {
    question: "A dishonest milkman mixes 1 liter of water in 4 liters of milk. What is the percentage of milk in the mixture?",
    options: ["60%", "70%", "75%", "80%"],
    correctAnswer: "80%",
    difficulty: "hard",
  },
  {
    question: "The compound interest on ₹5000 at 10% per annum for 2 years is:",
    options: ["₹1000", "₹1100", "₹1050", "₹1200"],
    correctAnswer: "₹1050",
    difficulty: "hard",
  },
  {
    question: "A train 240m long crosses a platform 360m long in 36 seconds. Find the speed of the train.",
    options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
    correctAnswer: "60 km/h",
    difficulty: "hard",
  },
  {
    question: "The difference between simple and compound interest on ₹5000 for 2 years at 5% per annum is:",
    options: ["₹10", "₹12.50", "₹15", "₹25"],
    correctAnswer: "₹12.50",
    difficulty: "hard",
  },
  {
    question: "A trader marks his goods 40% above the cost price and gives a discount of 25%. What is his profit percentage?",
    options: ["5%", "10%", "15%", "20%"],
    correctAnswer: "5%",
    difficulty: "hard",
  },
  {
    question: "If x² - 7x + 10 = 0, what are the roots of x?",
    options: ["2, 5", "3, 4", "1, 6", "5, 7"],
    correctAnswer: "2, 5",
    difficulty: "hard",
  },
  {
    question: "If a:b = 3:4 and b:c = 5:6, then a:c is?",
    options: ["3:5", "5:8", "15:24", "10:15"],
    correctAnswer: "15:24",
    difficulty: "hard",
  },
  {
    question: "A number when divided by 6 leaves a remainder of 3. What will be the remainder when its square is divided by 6?",
    options: ["0", "1", "3", "5"],
    correctAnswer: "3",
    difficulty: "hard",
  },
  {
    question: "A tank is filled by a pipe in 10 minutes and emptied by another in 15 minutes. How long will it take to fill the tank when both are open?",
    options: ["20 min", "25 min", "30 min", "35 min"],
    correctAnswer: "30 min",
    difficulty: "hard",
  },
    {
       question: "If the ratio of ages of A and B is 5:3 and A is 10 years older than B, what is B’s age?",
    options: ["10", "12", "15", "18"],
    correctAnswer: "15",

        "difficulty": "advance"
    },
    {
        "question": "If the sum of the first 10 terms of an arithmetic sequence is 200 and the first term is 5, what is the common difference?",
        "options": ["2", "3", "4", "5"],
        "correctAnswer": "3",
        "difficulty": "advance"
    },
    {
        "question": "A train travels 300 km in 5 hours. If the speed increases by 10 km/h every hour, what is the speed in the 5th hour?",
        "options": ["60 km/h", "70 km/h", "80 km/h", "90 km/h"],
        "correctAnswer": "80 km/h",
        "difficulty": "advance"
    },
    {
        "question": "A rectangular tank is 10 meters long, 5 meters wide, and 3 meters deep. If water is poured into the tank at a rate of 15 cubic meters per minute, how long will it take to fill the tank?",
        "options": ["10 minutes", "15 minutes", "20 minutes", "25 minutes"],
        "correctAnswer": "10 minutes",
        "difficulty": "advance"
    },
    {
        "question": "If the ratio of the ages of two friends is 3:5 and the sum of their ages is 48, what is the age of the younger friend?",
        "options": ["18", "20", "22", "24"],
        "correctAnswer": "18",
        "difficulty": "advance"
    },
    {
        "question": "A shopkeeper sells an item at a 20% discount and still makes a 10% profit. If the cost price is $200, what is the marked price?",
        "options": ["$250", "$275", "$300", "$325"],
        "correctAnswer": "$275",
        "difficulty": "advance"
    },
    {
        "question": "If the area of a circle is 154 square cm, what is its circumference? (Use π = 22/7)",
        "options": ["44 cm", "48 cm", "52 cm", "56 cm"],
        "correctAnswer": "44 cm",
        "difficulty": "advance"
    },
    {
        "question": "A man invests $5000 at 8% per annum compound interest. What will be the amount after 2 years?",
        "options": ["$5832", "$5928", "$6000", "$6080"],
        "correctAnswer": "$5832",
        "difficulty": "advance"
    },
    {
        "question": "If 12 workers can complete a task in 20 days, how many workers are needed to complete the same task in 15 days?",
        "options": ["16", "18", "20", "24"],
        "correctAnswer": "16",
        "difficulty": "advance"
    },
    {
        "question": "A car travels 240 km at a speed of 60 km/h and then another 300 km at a speed of 50 km/h. What is the average speed for the entire journey?",
        "options": ["52 km/h", "54 km/h", "56 km/h", "58 km/h"],
        "correctAnswer": "54 km/h",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of two numbers is 25 and their difference is 7, what is the product of the two numbers?",
        "options": ["144", "156", "168", "180"],
        "correctAnswer": "168",
        "difficulty": "advance"
    },
    {
        "question": "A man walks at a speed of 5 km/h for 2 hours and then at 4 km/h for 3 hours. What is his average speed for the entire journey?",
        "options": ["4.2 km/h", "4.4 km/h", "4.6 km/h", "4.8 km/h"],
        "correctAnswer": "4.4 km/h",
        "difficulty": "advance"
    },
    {
        "question": "If the perimeter of a square is 48 cm, what is the area of the square?",
        "options": ["144 cm²", "156 cm²", "168 cm²", "180 cm²"],
        "correctAnswer": "144 cm²",
        "difficulty": "advance"
    },
    {
        "question": "A man buys 20 pens for $100 and sells them at $6 each. What is his profit percentage?",
        "options": ["10%", "15%", "20%", "25%"],
        "correctAnswer": "20%",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of the interior angles of a polygon is 1800 degrees, how many sides does the polygon have?",
        "options": ["10", "12", "14", "16"],
        "correctAnswer": "12",
        "difficulty": "advance"
    },
    {
        "question": "A man borrows $5000 at 10% per annum simple interest. What will be the total amount to be repaid after 3 years?",
        "options": ["$6500", "$6600", "$6700", "$6800"],
        "correctAnswer": "$6500",
        "difficulty": "advance"
    },
    {
        "question": "If the ratio of the radii of two circles is 2:3, what is the ratio of their areas?",
        "options": ["4:9", "2:3", "8:27", "1:3"],
        "correctAnswer": "4:9",
        "difficulty": "advance"
    },
    {
        "question": "A man sells an article at a profit of 20%. If the selling price is $240, what is the cost price?",
        "options": ["$200", "$210", "$220", "$230"],
        "correctAnswer": "$200",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of the first 15 terms of an arithmetic sequence is 450 and the first term is 10, what is the common difference?",
        "options": ["2", "3", "4", "5"],
        "correctAnswer": "3",
        "difficulty": "advance"
    },
    {
        "question": "A train travels 400 km in 5 hours. If the speed increases by 10 km/h every hour, what is the speed in the 5th hour?",
        "options": ["80 km/h", "90 km/h", "100 km/h", "110 km/h"],
        "correctAnswer": "100 km/h",
        "difficulty": "advance"
    },
    {
        "question": "A rectangular tank is 12 meters long, 6 meters wide, and 4 meters deep. If water is poured into the tank at a rate of 18 cubic meters per minute, how long will it take to fill the tank?",
        "options": ["16 minutes", "18 minutes", "20 minutes", "22 minutes"],
        "correctAnswer": "16 minutes",
        "difficulty": "advance"
    },
    {
        "question": "If the ratio of the ages of two friends is 4:7 and the sum of their ages is 55, what is the age of the younger friend?",
        "options": ["20", "22", "24", "26"],
        "correctAnswer": "20",
        "difficulty": "advance"
    },
    {
        "question": "A shopkeeper sells an item at a 25% discount and still makes a 15% profit. If the cost price is $200, what is the marked price?",
        "options": ["$300", "$320", "$340", "$360"],
        "correctAnswer": "$320",
        "difficulty": "advance"
    },
    {
        "question": "If the area of a circle is 616 square cm, what is its circumference? (Use π = 22/7)",
        "options": ["88 cm", "92 cm", "96 cm", "100 cm"],
        "correctAnswer": "88 cm",
        "difficulty": "advance"
    },
    {
        "question": "A man invests $6000 at 10% per annum compound interest. What will be the amount after 3 years?",
        "options": ["$7986", "$8086", "$8186", "$8286"],
        "correctAnswer": "$7986",
        "difficulty": "advance"
    },
    {
        "question": "If 15 workers can complete a task in 25 days, how many workers are needed to complete the same task in 20 days?",
        "options": ["18", "20", "22", "24"],
        "correctAnswer": "18",
        "difficulty": "advance"
    },
    {
        "question": "A car travels 300 km at a speed of 60 km/h and then another 400 km at a speed of 80 km/h. What is the average speed for the entire journey?",
        "options": ["68 km/h", "70 km/h", "72 km/h", "74 km/h"],
        "correctAnswer": "70 km/h",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of two numbers is 30 and their difference is 8, what is the product of the two numbers?",
        "options": ["216", "224", "232", "240"],
        "correctAnswer": "224",
        "difficulty": "advance"
    },
    {
        "question": "A man walks at a speed of 6 km/h for 3 hours and then at 5 km/h for 2 hours. What is his average speed for the entire journey?",
        "options": ["5.4 km/h", "5.6 km/h", "5.8 km/h", "6.0 km/h"],
        "correctAnswer": "5.6 km/h",
        "difficulty": "advance"
    },
    {
        "question": "If the perimeter of a square is 60 cm, what is the area of the square?",
        "options": ["225 cm²", "240 cm²", "255 cm²", "270 cm²"],
        "correctAnswer": "225 cm²",
        "difficulty": "advance"
    },
    {
        "question": "A man buys 25 pens for $125 and sells them at $6 each. What is his profit percentage?",
        "options": ["20%", "25%", "30%", "35%"],
        "correctAnswer": "20%",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of the interior angles of a polygon is 2160 degrees, how many sides does the polygon have?",
        "options": ["12", "14", "16", "18"],
        "correctAnswer": "14",
        "difficulty": "advance"
    },
    {
        "question": "A man borrows $6000 at 12% per annum simple interest. What will be the total amount to be repaid after 4 years?",
        "options": ["$8880", "$9000", "$9120", "$9240"],
        "correctAnswer": "$8880",
        "difficulty": "advance"
    },
    {
        "question": "If the ratio of the radii of two circles is 3:4, what is the ratio of their areas?",
        "options": ["9:16", "3:4", "12:25", "1:2"],
        "correctAnswer": "9:16",
        "difficulty": "advance"
    },
    {
        "question": "A man sells an article at a profit of 25%. If the selling price is $300, what is the cost price?",
        "options": ["$240", "$250", "$260", "$270"],
        "correctAnswer": "$240",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of the first 20 terms of an arithmetic sequence is 600 and the first term is 10, what is the common difference?",
        "options": ["2", "3", "4", "5"],
        "correctAnswer": "3",
        "difficulty": "advance"
    },
    {
        "question": "A train travels 500 km in 6 hours. If the speed increases by 10 km/h every hour, what is the speed in the 6th hour?",
        "options": ["100 km/h", "110 km/h", "120 km/h", "130 km/h"],
        "correctAnswer": "120 km/h",
        "difficulty": "advance"
    },
    {
        "question": "A rectangular tank is 15 meters long, 8 meters wide, and 5 meters deep. If water is poured into the tank at a rate of 20 cubic meters per minute, how long will it take to fill the tank?",
        "options": ["30 minutes", "35 minutes", "40 minutes", "45 minutes"],
        "correctAnswer": "30 minutes",
        "difficulty": "advance"
    },
    {
        "question": "If the ratio of the ages of two friends is 5:8 and the sum of their ages is 65, what is the age of the younger friend?",
        "options": ["25", "30", "35", "40"],
        "correctAnswer": "25",
        "difficulty": "advance"
    },
    {
        "question": "A shopkeeper sells an item at a 30% discount and still makes a 20% profit. If the cost price is $250, what is the marked price?",
        "options": ["$400", "$420", "$440", "$460"],
        "correctAnswer": "$400",
        "difficulty": "advance"
    },
    {
        "question": "If the area of a circle is 1256 square cm, what is its circumference? (Use π = 3.14)",
        "options": ["125.6 cm", "130.6 cm", "135.6 cm", "140.6 cm"],
        "correctAnswer": "125.6 cm",
        "difficulty": "advance"
    },
    {
        "question": "A man invests $7000 at 12% per annum compound interest. What will be the amount after 4 years?",
        "options": ["$11,200", "$11,400", "$11,600", "$11,800"],
        "correctAnswer": "$11,200",
        "difficulty": "advance"
    },
    {
        "question": "If 18 workers can complete a task in 30 days, how many workers are needed to complete the same task in 25 days?",
        "options": ["20", "22", "24", "26"],
        "correctAnswer": "22",
        "difficulty": "advance"
    },
    {
        "question": "A car travels 400 km at a speed of 80 km/h and then another 500 km at a speed of 100 km/h. What is the average speed for the entire journey?",
        "options": ["88 km/h", "90 km/h", "92 km/h", "94 km/h"],
        "correctAnswer": "90 km/h",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of two numbers is 35 and their difference is 9, what is the product of the two numbers?",
        "options": ["286", "294", "302", "310"],
        "correctAnswer": "286",
        "difficulty": "advance"
    },
    {
        "question": "A man walks at a speed of 7 km/h for 4 hours and then at 6 km/h for 3 hours. What is his average speed for the entire journey?",
        "options": ["6.4 km/h", "6.6 km/h", "6.8 km/h", "7.0 km/h"],
        "correctAnswer": "6.6 km/h",
        "difficulty": "advance"
    },
    {
        "question": "If the perimeter of a square is 72 cm, what is the area of the square?",
        "options": ["324 cm²", "336 cm²", "348 cm²", "360 cm²"],
        "correctAnswer": "324 cm²",
        "difficulty": "advance"
    },
    {
        "question": "A man buys 30 pens for $150 and sells them at $6 each. What is his profit percentage?",
        "options": ["20%", "25%", "30%", "35%"],
        "correctAnswer": "20%",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of the interior angles of a polygon is 2520 degrees, how many sides does the polygon have?",
        "options": ["14", "16", "18", "20"],
        "correctAnswer": "16",
        "difficulty": "advance"
    },
    {
        "question": "A man borrows $7000 at 15% per annum simple interest. What will be the total amount to be repaid after 5 years?",
        "options": ["$12,250", "$12,500", "$12,750", "$13,000"],
        "correctAnswer": "$12,250",
        "difficulty": "advance"
    },
    {
        "question": "If the ratio of the radii of two circles is 4:5, what is the ratio of their areas?",
        "options": ["16:25", "4:5", "20:31", "1:2"],
        "correctAnswer": "16:25",
        "difficulty": "advance"
    },
    {
        "question": "A man sells an article at a profit of 30%. If the selling price is $390, what is the cost price?",
        "options": ["$300", "$310", "$320", "$330"],
        "correctAnswer": "$300",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of the first 25 terms of an arithmetic sequence is 750 and the first term is 10, what is the common difference?",
        "options": ["2", "3", "4", "5"],
        "correctAnswer": "3",
        "difficulty": "advance"
    },
    {
        "question": "A train travels 600 km in 7 hours. If the speed increases by 10 km/h every hour, what is the speed in the 7th hour?",
        "options": ["120 km/h", "130 km/h", "140 km/h", "150 km/h"],
        "correctAnswer": "140 km/h",
        "difficulty": "advance"
    },
    {
        "question": "A rectangular tank is 18 meters long, 10 meters wide, and 6 meters deep. If water is poured into the tank at a rate of 24 cubic meters per minute, how long will it take to fill the tank?",
        "options": ["45 minutes", "50 minutes", "55 minutes", "60 minutes"],
        "correctAnswer": "45 minutes",
        "difficulty": "advance"
    },
    {
        "question": "If the ratio of the ages of two friends is 6:9 and the sum of their ages is 75, what is the age of the younger friend?",
        "options": ["30", "35", "40", "45"],
        "correctAnswer": "30",
        "difficulty": "advance"
    },
    {
        "question": "A shopkeeper sells an item at a 35% discount and still makes a 25% profit. If the cost price is $300, what is the marked price?",
        "options": ["$500", "$520", "$540", "$560"],
        "correctAnswer": "$500",
        "difficulty": "advance"
    },
    {
        "question": "If the area of a circle is 1540 square cm, what is its circumference? (Use π = 22/7)",
        "options": ["140 cm", "150 cm", "160 cm", "170 cm"],
        "correctAnswer": "140 cm",
        "difficulty": "advance"
    },
    {
        "question": "A man invests $8000 at 15% per annum compound interest. What will be the amount after 5 years?",
        "options": ["$16,000", "$16,500", "$17,000", "$17,500"],
        "correctAnswer": "$16,000",
        "difficulty": "advance"
    },
    {
        "question": "If 20 workers can complete a task in 35 days, how many workers are needed to complete the same task in 30 days?",
        "options": ["22", "24", "26", "28"],
        "correctAnswer": "24",
        "difficulty": "advance"
    },
    {
        "question": "A car travels 500 km at a speed of 100 km/h and then another 600 km at a speed of 120 km/h. What is the average speed for the entire journey?",
        "options": ["110 km/h", "112 km/h", "114 km/h", "116 km/h"],
        "correctAnswer": "112 km/h",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of two numbers is 40 and their difference is 10, what is the product of the two numbers?",
        "options": ["375", "390", "405", "420"],
        "correctAnswer": "375",
        "difficulty": "advance"
    },
    {
        "question": "A man walks at a speed of 8 km/h for 5 hours and then at 7 km/h for 4 hours. What is his average speed for the entire journey?",
        "options": ["7.4 km/h", "7.6 km/h", "7.8 km/h", "8.0 km/h"],
        "correctAnswer": "7.6 km/h",
        "difficulty": "advance"
    },
    {
        "question": "If the perimeter of a square is 80 cm, what is the area of the square?",
        "options": ["400 cm²", "420 cm²", "440 cm²", "460 cm²"],
        "correctAnswer": "400 cm²",
        "difficulty": "advance"
    },
    {
        "question": "A man buys 35 pens for $175 and sells them at $6 each. What is his profit percentage?",
        "options": ["20%", "25%", "30%", "35%"],
        "correctAnswer": "20%",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of the interior angles of a polygon is 2880 degrees, how many sides does the polygon have?",
        "options": ["16", "18", "20", "22"],
        "correctAnswer": "18",
        "difficulty": "advance"
    },
    {
        "question": "A man borrows $8000 at 18% per annum simple interest. What will be the total amount to be repaid after 6 years?",
        "options": ["$16,640", "$16,800", "$17,000", "$17,200"],
        "correctAnswer": "$16,640",
        "difficulty": "advance"
    },
    {
        "question": "If the ratio of the radii of two circles is 5:6, what is the ratio of their areas?",
        "options": ["25:36", "5:6", "30:43", "1:2"],
        "correctAnswer": "25:36",
        "difficulty": "advance"
    },
    {
        "question": "A man sells an article at a profit of 35%. If the selling price is $405, what is the cost price?",
        "options": ["$300", "$310", "$320", "$330"],
        "correctAnswer": "$300",
        "difficulty": "advance"
    },
    {
        "question": "If the sum of the first 30 terms of an arithmetic sequence is 900 and the first term is 10, what is the common difference?",
        "options": ["2", "3", "4", "5"],
        "correctAnswer": "3",
        "difficulty": "advance"
    },
    {
        "question": "A train travels 700 km in 8 hours. If the speed increases by 10 km/h every hour, what is the speed in the 8th hour?",
        "options": ["150 km/h", "160 km/h", "170 km/h", "180 km/h"],
        "correctAnswer": "160 km/h",
        "difficulty": "advance"
    },
    {
        "question": "A rectangular tank is 20 meters long, 12 meters wide, and 8 meters deep. If water is poured into the tank at a rate of 30 cubic meters per minute, how long will it take to fill the tank?",
        "options": ["64 minutes", "68 minutes", "72 minutes", "76 minutes"],
        "correctAnswer": "64 minutes",
        "difficulty": "advance"
    },
    {
        "question": "If the ratio of the ages of two friends is 7:10 and the sum of their ages is 85, what is the age of the younger friend?",
        "options": ["35", "40", "45", "50"],
        "correctAnswer": "35",
        "difficulty": "advance"
    },
{
"question": "A company manufactures 1500 units of a product in 10 days. If the number of units produced increases by 20% each day, how many units will be produced on the 7th day?",
"options": ["2592", "2700", "2808", "3000"],
"correctAnswer": "2808",
"difficulty": "advance"
},
{
"question": "A can complete a task in 20 days, and B can complete the same task in 30 days. If they work together for 6 days, what fraction of the work remains?",
"options": ["2/5", "1/2", "3/5", "7/10"],
"correctAnswer": "3/5",
"difficulty": "advance"
},
{
"question": "A train passes a pole in 12 seconds and a platform 300 meters long in 24 seconds. Find the length of the train.",
"options": ["200 m", "240 m", "260 m", "280 m"],
"correctAnswer": "240 m",
"difficulty": "advance"
},
{
"question": "The average age of 10 students in a class is 18 years. If a new student joins, the average age increases by 1 year. Find the age of the new student.",
"options": ["19 years", "20 years", "28 years", "29 years"],
"correctAnswer": "29 years",
"difficulty": "advance"
},
{
"question": "A trader sells an article at a profit of 15%. If he had bought it at 10% less and sold it for Rs.5 less, he would have gained 25%. Find the cost price of the article.",
"options": ["Rs.200", "Rs.250", "Rs.300", "Rs.350"],
"correctAnswer": "Rs.250",
"difficulty": "advance"
},
{
"question": "A person invests Rs.5000 at 10% per annum compound interest. Find the total amount after 3 years.",
"options": ["Rs.6050", "Rs.6655", "Rs.6500", "Rs.7000"],
"correctAnswer": "Rs.6655",
"difficulty": "advance"
},
{
"question": "If a triangle's sides are in the ratio 3:4:5 and its perimeter is 36 cm, find the area of the triangle.",
"options": ["54 cm²", "72 cm²", "90 cm²", "108 cm²"],
"correctAnswer": "54 cm²",
"difficulty": "advance"
},
{
"question": "The speed of a boat in still water is 15 km/hr. If the river's speed is 3 km/hr, how long will it take to travel 48 km downstream?",
"options": ["3 hours", "4 hours", "5 hours", "6 hours"],
"correctAnswer": "3 hours",
"difficulty": "advance"
},
{
"question": "A number consists of two digits whose sum is 10. If the digits are reversed, the new number is 36 more than the original. Find the original number.",
"options": ["28", "37", "46", "19"],
"correctAnswer": "46",
"difficulty": "advance"
},
{
"question": "A person walks at 6 km/hr instead of 4 km/hr, thereby reaching 30 minutes earlier. Find the actual distance to be covered.",
"options": ["6 km", "8 km", "10 km", "12 km"],
"correctAnswer": "6 km",
"difficulty": "advance"
},
{
"question": "A train running at 90 km/hr crosses a bridge 150 meters long in 18 seconds. Find the length of the train.",
"options": ["200 m", "220 m", "250 m", "270 m"],
"correctAnswer": "250 m",
"difficulty": "advance"
},
{
"question": "A trader allows a discount of 20% and still makes a profit of 25%. Find the marked price of an article that costs Rs.600.",
"options": ["Rs.900", "Rs.1000", "Rs.1050", "Rs.1125"],
"correctAnswer": "Rs.1000",
"difficulty": "advance"
},
{
"question": "A can complete a job in 12 days, and B can do the same job in 18 days. If they work together for 4 days, how much work is left?",
"options": ["1/3", "2/5", "5/9", "7/12"],
"correctAnswer": "5/9",
"difficulty": "advance"
},
{
"question": "A shopkeeper mixes two types of tea, one costing Rs.200 per kg and the other costing Rs.250 per kg, in the ratio 3:2. Find the price of the mixture per kg.",
"options": ["Rs.220", "Rs.230", "Rs.240", "Rs.245"],
"correctAnswer": "Rs.230",
"difficulty": "advance"
},
{
"question": "A, B, and C can complete a task in 15, 20, and 30 days respectively. If they work together, how long will they take to complete the task?",
"options": ["5 days", "7 days", "8 days", "10 days"],
"correctAnswer": "8 days",
"difficulty": "advance"
},
{
"question": "A person takes a loan of Rs.10,000 at 5% per annum simple interest. How much interest does he pay after 4 years?",
"options": ["Rs.1500", "Rs.2000", "Rs.2500", "Rs.3000"],
"correctAnswer": "Rs.2000",
"difficulty": "advance"
},
{
"question": "A clock shows 10:15. What is the angle between the hour and minute hands?",
"options": ["30°", "37.5°", "45°", "52.5°"],
"correctAnswer": "37.5°",
"difficulty": "advance"
},
{
"question": "A rectangle has a length that is twice its breadth. If its perimeter is 48 cm, find its area.",
"options": ["96 cm²", "108 cm²", "120 cm²", "144 cm²"],
"correctAnswer": "96 cm²",
"difficulty": "advance"
},
{
"question": "A train moving at 72 km/hr passes a platform in 25 seconds. If the train is 200 meters long, find the length of the platform.",
"options": ["200 m", "250 m", "300 m", "350 m"],
"correctAnswer": "300 m",
"difficulty": "advance"
},
{
"question": "The sum of the ages of A and B is 60 years. Ten years ago, A was twice as old as B. Find A’s current age.",
"options": ["35 years", "38 years", "40 years", "42 years"],
"correctAnswer": "40 years",
"difficulty": "advance"
},
{
"question": "A person walks at 5 km/hr and reaches his destination 10 minutes late. If he walks at 6 km/hr, he reaches on time. Find the actual distance.",
"options": ["4 km", "5 km", "6 km", "7 km"],
"correctAnswer": "5 km",
"difficulty": "advance"
},
{
"question": "A number, when divided by 7, gives a remainder of 5. What will be the remainder when the same number is divided by 14?",
"options": ["2", "5", "7", "9"],
"correctAnswer": "5",
"difficulty": "advance"
},
{
"question": "A water tank has two pipes. One fills the tank in 8 hours, and the other empties it in 12 hours. If both pipes are open, how long will it take to fill the tank?",
"options": ["24 hours", "30 hours", "32 hours", "36 hours"],
"correctAnswer": "24 hours",
"difficulty": "advance"
},
{
"question": "A sum of Rs.5000 is invested at 8% per annum compound interest. Find the amount after 2 years.",
"options": ["Rs.5832", "Rs.5830", "Rs.5850", "Rs.5880"],
"correctAnswer": "Rs.5832",
"difficulty": "advance"
},
{
"question": "A cube’s total surface area is 486 cm². Find its volume.",
"options": ["512 cm³", "729 cm³", "1000 cm³", "1331 cm³"],
"correctAnswer": "729 cm³",
"difficulty": "advance"
},
{
"question": "A ladder leans against a wall at an angle of 60°. If the foot of the ladder is 5 meters from the base of the wall, find the ladder’s length.",
"options": ["10 m", "12 m", "15 m", "18 m"],
"correctAnswer": "10 m",
"difficulty": "advance"
},
{
"question": "A train traveling at 108 km/hr crosses a pole in 12 seconds. Find the length of the train.",
"options": ["300 m", "320 m", "360 m", "400 m"],
"correctAnswer": "360 m",
"difficulty": "advance"
},
  
];

const seedDB = async () => {
  await Question.deleteMany({});
  await Question.insertMany(questions);
  console.log("Database Seeded!");
  mongoose.connection.close();
};

seedDB();
