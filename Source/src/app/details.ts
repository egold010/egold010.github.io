export interface CardItem {
    title: string,
    description: string,
    category: string,
    date: string,
    highlighted?: boolean
}

export const Projects: CardItem[] = [
    {
        title: "YOLO in PyTorch",
        description: "I implemented the YOLO (You Only Look Once) real time object detection model in PyTorch.",
        category: "Machine Learning",
        date: "5/29/2024"
    },
    {
        title: "Minecraft Dataset",
        description: "I made a dataset of 20,000+ screenshots of minecraft with full depth and semantic annotations.",
        category: "Machine Learning",
        date: "10/21/2024"
    },
    {
        title: "Arduino Galactica",
        description: "I made a simple version of Galactica using AVR C++ as the final project for my Embedded Systems class.",
        category: "Electrical",
        date: "6/9/2024"
    },
    {
        title: "Geometry Dash RL",
        description: "I made a bot that learned to play a simplified version of geometry dash with machine learning.",
        category: "Machine Learning",
        date: "8/4/2023"
    },
    {
        title: "Website",
        description: "I made this website using AngularJS to act as a professional portfolio.",
        category: "General SW",
        date: "9/17/2022"
    },
    {
        title: "Early Games",
        description: "A collection of lower quality games I made when I was still learning the basics of game development.",
        category: "Game Dev",
        date: "9/21/2022"
    },
    {
        title: "Mecha Raptor Simulator",
        description: "A Roblox game where you play as a robot velociraptor. This game is still a work in progress.",
        category: "Game Dev",
        date: "12/18/2022"
    },
    {
        title: "Piano Tiles Player",
        description: "Python/C# application to get as high of a score in piano tiles as possible.",
        category: "Game Bot",
        date: "9/21/2022"
    },
    {
        title: "Chess Player",
        description: "Python application to play chess on chess.com by reading the screen and moving accordingly. Uses Stockfish chess engine.",
        category: "Game Bot",
        date: "11/22/2022"
    },
    {
        title: "Jurassic World Player",
        description: "Using Tesseract from google, I made a bot to read the current state of the battle and move accordingly.",
        category: "Game Bot",
        date: "9/28/2022"
    },
    // {
    //     title: "Fluidigm Internship",
    //     description: "Interned in software development at Fluidigm, where I worked closely with the hardware of the instrument.",
    //     category: "Work Experience"
    // },
    // {
    //     title: "Seer Internship",
    //     description: "Interned in software development at Seer, where I mainly developed a customer facing UI for the instrument.",
    //     category: "Work Experience"
    // },
    {
        title: "3D Modeling with blender",
        description: "Created various 3d models in blender mainly for use in game development.",
        category: "Game Dev",
        date: "11/15/2022"
    },
    {
        title: "Random Map Generator",
        description: "Created random dungeons using cellular automation and perlin noise.",
        category: "Game Dev",
        date: "12/18/2022"
    },
]