import AppRepository from "@/repository/AppRepository";
import CineseAppService from "@/services/CineseAppService";

const globalForAppService = global as unknown as { appService: CineseAppService };

export const cineseAppService = globalForAppService.appService || new CineseAppService(new AppRepository());

if (process.env.NODE_ENV !== "production") globalForAppService.appService = cineseAppService;

export default cineseAppService;