export const user_intent_scrore = {
    day: {
        good: 5,
        bad: -5,
        average: 1
    },
    drinks: {
        true: 1,
        false: -1
    },
    emotion: {
        happy: 3,
        sad: -10,
        neutral: 1
    },
    primaryEmotion: {
        anger: -10,
        contempt: -8,
        disgust: -6,
        fear: -4,
        happiness: 3,
        neutral: 1,
        sadness: -10,
        surprise: 2
    },
    secondaryEmotion: {
        anger: -10,
        contempt: -8,
        disgust: -6,
        fear: -4,
        happiness: 3,
        neutral: 1,
        sadness: -10,
        surprise: 2
    },
    food: {
        true: 2,
        false: -2
    },
    friend: {
        true: 4,
        false: -4
    },
    sleep: {
        true: 7,
        false: -7
    },
    workout: {
        true: 6,
        false: -6
    }
};

export const mood_keyword = {
    superHappy: {
        mood: 'Super Happy',
        youtube: {
            keywords: 'Happiness, Meditation'
        },
        spotify: {
            keywords: 'Happiness, Meditation',
            albums: ['6mDTSYtYXDvYwqrnGp7Wba', '0IWSAYk1eweQltmZJaspFv']
        }
    },
    active: {
        mood: 'Active',
        youtube: {
            keywords: 'Light Fitness Songs: Sounds of Nature & Piano Background Music, Background Music For Cooking'
        },
        spotify: {
            keywords: 'Light Fitness Songs: Sounds of Nature & Piano Background Music, Background Music For Cooking',
            albums: ['5njMahLKD1tLJ5bejvqseV', '2iEFhEBHHYX2h8deMED6a7']
        }
    },
    generalMeditation: {
        mood: 'General Meditation',
        youtube: {
            keywords: 'Music for stress, Anxiety, relaxation, depression, isochronic tones'
        },
        spotify: {
            keywords: 'Music for stress, Anxiety, relaxation, depression, isochronic tones',
            albums: ['3znG7nJVq2dSLjAbyH3f30', '0XhZXGXV0Knx0z5wkQrRgi', '4kgEUBj2RqWI8XQ40wUJ2z']
        }
    },
    sad : {
        mood: 'Sad',
        youtube: {
            keywords: 'Overcome sadness, Healing Binaural Rain'
        },
        spotify: {
            keywords: 'Overcome sadness, Healing Binaural Rain',
            albums: ['5lWKhMEB1HAYGo8i3AndCm', '0U18eW5AbZ7LRUeXnVjOha', '4jgqdwxbMP8SiJ8lYHbe41']
        }
    }
};