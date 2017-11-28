/* export enum Day {
    GOOD = 'GOOD',
    AVERAGE = 'AVERAGE',
    BAD = 'BAD'
};

export enum Emotion {
    ANGER = 'ANGER',
    CONTEMPT = 'CONTEMPT',
    DISGUST = 'DISGUST',
    FEAR = 'FEAR',
    HAPPINESS = 'HAPPINESS',
    NEUTRAL = 'NEUTRAL',
    SADNESS = 'SADNESS',
    SURPRISE = 'SURPRISE',
} */

export interface IUserInfo {
    day?: string;
    friend?: boolean;
    workout?: boolean;
    sleep?: boolean;
    drinks?: boolean;
    emotion?: string;
    food?: boolean;
};