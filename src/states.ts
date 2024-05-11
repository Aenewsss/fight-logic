import { IAbout, ISchedule, ITeam } from "./interfaces";

export const ScheduleInitialState: ISchedule = {
    friday: [''],
    monday: [''],
    saturday: [''],
    sunday: [''],
    thursday: [''],
    tuesday: [''],
    wednesday: ['']
}

export const TeamInitialState: ITeam = {
    image: '',
    logo: '',
    name: 'Constrictor',
    text: ''
}

export const AboutInitialState: IAbout = {
    image: '',
    text: ''
}