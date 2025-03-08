import { IAbout, ICourse, IFeedback, ISchedule, IStripeProducts, ITeam } from "./interfaces";

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

export const CourseInitialState: ICourse = {
    image: '',
    name: 'Curso 1',
    text: '',
    link: ''
}

export const AboutInitialState: IAbout = {
    image: '',
    text: ''
}

export const StripeProductsInitialState: IStripeProducts[] = [{
    name: 'Jiu',
    price: '100',
    monthly: 100,
    totalYear: 1200,
    priceId: ''
}]

export const FeedbacksInitialState: IFeedback[] = [
    {
        image: '/feedbacks/feedback-1.mp4', name: 'Daniel Victor', text: '', url: '/feedbacks/daniel.jpeg',
    },
    {
        image: '/feedbacks/feedback-2.mp4', name: 'Bia', text: '', url: '/feedbacks/bia-fight.png',
    }
]