import AppRepository from "@/repository/AppRepository";

export default class CineseAppService {
    constructor(private readonly appRepository: AppRepository){}
    
    getAllApps = async () => {
        const apps = await this.appRepository.getAllApps();
        return apps;
    }

    getUserApps = async (userId: string) => {
        const apps = await this.appRepository.getUserApps(userId);
        return apps;
    }
}
