import { database } from "@/app/lib/firebase"
import { IRecurringData, IResponse, RecurringEnum } from "@/interfaces"
import { get, ref, remove, set } from "firebase/database"

class PlanService {
    async getPlans(): Promise<IResponse> {
        const dbRef = ref(database, 'plans/')
        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: 'Nenhum plano encontrado' }

        return { error: null, data: data.val().filter(Boolean) }
    }

    async getPlanById(id:string): Promise<IResponse> {
        const dbRef = ref(database, `plans/${id}`)
        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: 'Nenhum plano encontrado' }

        return { error: null, data: data.val() }
    }



    async insertPlan(text: string, name: string, recurring:IRecurringData[]): Promise<IResponse> {
        try {
            const dbRef = ref(database, `plans`)

            const { length } = (await get(dbRef)).val() || { length: 0 }

            const newDbRef = ref(database, `plans/${length}`)

            await set(newDbRef, {
                text,
                name,
                recurring
            })

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async removePlan(index: string): Promise<IResponse> {
        try {
            const dbRef = ref(database, `plans`);
            const snapshot = await get(dbRef);
    
            if (!snapshot.exists()) {
                throw new Error('No plans found');
            }
    
            const plans = snapshot.val();
            const planKeys = Object.keys(plans);
            const planKey = planKeys[index];
    
            if (!planKey) {
                throw new Error('Invalid index');
            }
    
            const removeDbRef = ref(database, `plans/${planKey}`);
            await remove(removeDbRef);
            
            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async updatePlan(id: string, text: string, name: string,recurring:IRecurringData[]): Promise<IResponse> {
        try {

            const dbRef = ref(database, `plans/${id}`)

            await set(dbRef, {
                text,
                recurring,
                name,
            })

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

}

const planService = new PlanService()
export default planService