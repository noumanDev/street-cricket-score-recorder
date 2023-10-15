// Type for a single ball
type Ball = {
    score: number; // Runs scored on the ball
    isWide: boolean; // Indicates if it's a wide ball
    isNoBall: boolean; // Indicates if it's a no-ball
    isWicket: boolean; // Indicates if it's a wicket-taking ball
};

// Type for an inning
type Inning = {
    balls: Ball[]; // Array of balls bowled in the inning
    locked: boolean;
    // totalScore: number; // Total runs scored in the inning
    // totalWides: number; // Total wides in the inning
    // totalNoBalls: number; // Total no-balls in the inning
    // totalWickets: number; // Total wickets fallen in the inning
    // numOfOvers: number; // Number of completed overs in the inning
};

// Type for a cricket match with two innings
type CricketMatch = {
    id: number;
    inning1: Inning; // First inning
    inning2: Inning; // Second inning
    matchDate: Date;
    overs: number
};

interface SecondInningSpecifics {
    target: number;
    required:number;
    remainingBalls: number;

}

interface InningStats {
    score: number;
    wickets: number;
    overDetails: GroupedBallsAndOvers;
    secondInningSpecifics: SecondInningSpecifics | null
}

type GroupedBalls = Ball[][];
type OversCount = {
    totalOvers: number;
    lastOverBalls: number;
};
type GroupedBallsAndOvers = {
    groupedBalls: GroupedBalls;
    oversCount: OversCount;
    validDeliveries: number; //total valid balls in inning
};