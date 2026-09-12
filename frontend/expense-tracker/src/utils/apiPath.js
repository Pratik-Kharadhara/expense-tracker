export const BASE_URL = "http://localhost:3456";

//utils paths 
export const API_PATHS = {
    AUTH :{

    },
    INCOME :{
        ADD_INCOME :"/api/income/addincome",
        FIND_ALLINCOME : "/api/income/findallIncomes",
        DELETE_INCOME : (incomeID)=>`/api/income/delete/${incomeID}`,
        DOWNLOAD_EXCELL : "/api/income/excellDownload",
    }
}