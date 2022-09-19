export interface CardItem {
    title: string,
    description: string,
    category: string,
    highlighted?: boolean
}

export const Projects: CardItem[] = [
    {
        title: "Website",
        description: "I made this website to act as a professional portfolio in AngularJS.",
        category: "General SW"
    },
    {
        title: "Early games",
        description: "A collection of lower quality games I made when I was still learning how to make games.",
        category: "Game Dev"
    },
    {
        title: "Mecha Raptor Simulator",
        description: "A Roblox game where you play as a robot velociraptor. This game is still a work in progress.",
        category: "Game Dev"
    },
    {
        title: "Piano Tiles Player",
        description: "Python/C# application to get as high of a score in piano tiles as possible.",
        category: "Game Bot"
    },
    {
        title: "Jurrasic World Player",
        description: "Using Tesseract from google, I made a bot to read the current state of the battle and move accordingly.",
        category: "Game Bot"
    },
    {
        title: "Fluidigm Internship",
        description: "Interned in software development at Fluidigm, where I worked closely with the hardware of the instrument.",
        category: "Work Experience"
    },
    {
        title: "Seer Internship",
        description: "Interned in software development at Seer, where I mainly on developing a customer facing UI for the instrument.",
        category: "Work Experience"
    },
    {
        title: "Blender modeling",
        description: "Created various 3d models in blender mainly for use in game development.",
        category: "Game Dev"
    },
]