export const BASE_URL = "http://localhost:3456";

//utils paths 
export const API_PATHS = {
    AUTH :{
        LOGIN :"/api/auth/login",
        SIGNUP :"/api/auth/signup",
        FOUND_USER:"/api/auth/founduser"
    },
    DASHBOARD:{
        GET_DASHBOARD:"api/dashboard/"
    },
    INCOME :{
        ADD_INCOME :"/api/income/addincome",
        FIND_ALLINCOME : "/api/income/findallIncomes",
        DELETE_INCOME : (incomeID)=>`/api/income/delete/${incomeID}`,
        DOWNLOAD_EXCELL : "/api/income/excellDownload",
    },
    EXPENSE :{
         ADD_EXPENSE :"/api/expense/addExpense",
        FIND_ALLEXPENSE : "/api/expense/findallExpense",
        DELETE_EXPENSE : (expenseID)=>`/api/expense/deleteExpense/${expenseID}`,
        DOWNLOAD_EXCELL : "/api/expense/downloadExcell",
    },
    IMAGE:{
        IMAGE_UPLOAD :"/api/auth/upload-image"
        
    }
}