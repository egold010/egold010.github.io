export interface CardItem {
    title: string,
    description: string,
    category: string,
    date: string,
    skills?: string[],
    highlighted?: boolean,
    relevant?: boolean
}

export const Projects: CardItem[] = [
    {
        title: "VGGT Visual SLAM",
        description: "I'm working on utilizing the new VGGT model to implement a new Visual SLAM algorithm that relies solely on visual data. Not even IMU data is used.",
        category: "Software",
        date: "4/12/2025",
        relevant: true,
        skills: ["Python", "SLAM"]
    },
    {
        title: "SLAM from Scratch",
        description: "I developed a custom ROS2 node to implement the SLAM algorithm from the ground up, utilizing odometry and LIDAR data from the TurtleBot3 library.",
        category: "Software",
        date: "3/19/2025",
        skills: ["ROS2", "Python", "Linux", "SLAM"]
    },
    {
        title: "MNIST Classifier",
        description: "I created a linear MNIST classifier from scratch in Python. I include derivations for linear and quadratic loss gradients.",
        category: "Software",
        date: "10/21/2024",
        relevant: true,
        skills: ["Python", "Computer Vision"]
    },
    {
        title: "Raw Pixel Data RL",
        description: "I compared CNNs and ViTs on their ability to function as the neural network backbone of a RL agent with raw pixels as observations. Experimented on OpenAI's Atari environments.",
        category: "Machine Learning",
        date: "12/7/2024",
        relevant: true,
        skills: ["Python", "PyTorch", "RL", "CNN", "ViT", "Computer Vision"]
    },
    {
        title: "MC Data Experiments",
        description: "I trained CNNs on the Minecraft Dataset I made and compared their performance to foundation models.",
        category: "Machine Learning",
        date: "12/3/2024",
        relevant: true,
        skills: ["Python", "PyTorch", "CNN", "Computer Vision"]
    },
    {
        title: "Bullet Hopper PPO",
        description: "I implemented the PPO (Proximal Policy Optimization) algorithm in PyTorch and trained it on the Bullet Hopper environment.",
        category: "Machine Learning",
        date: "11/18/2024",
        relevant: true,
        skills: ["Python", "PyTorch", "RL"]
    },
    {
        title: "YOLO in PyTorch",
        description: "I implemented the YOLO (You Only Look Once) real time object detection model in PyTorch.",
        category: "Machine Learning",
        date: "5/29/2024",
        relevant: true,
        skills: ["Python", "PyTorch", "CNN", "Computer Vision"]
    },
    {
        title: "Minecraft Dataset",
        description: "I made a dataset of 20,000+ screenshots of minecraft with full depth and semantic annotations.",
        category: "Machine Learning",
        date: "10/21/2024",
        skills: ["Java", "Computer Vision"]
    },
    {
        title: "Arduino Galactica",
        description: "I made a simple version of Galactica using AVR C++ as the final project for my Embedded Systems class.",
        category: "Electrical",
        date: "6/9/2024",
        relevant: true,
        skills: ["C++", "Game Dev", "Electrical", "Embedded Systems"],
    },
    {
        title: "Geometry Dash RL",
        description: "I made a bot that learned to play a simplified version of geometry dash with machine learning.",
        category: "Machine Learning",
        date: "8/4/2023",
        skills: ["Python", "PyTorch", "RL", "Game Dev"]
    },
    {
        title: "Website",
        description: "I made this website using AngularJS to act as a professional portfolio.",
        category: "General SW",
        date: "9/17/2022"
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