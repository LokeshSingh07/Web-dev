import React from 'react'
import { toast } from 'react-hot-toast';
import { APIConnector } from '../APIConnector';
import { catalogData } from '../APIS';


const {
    CATALOGPAGEDATA_API
} = catalogData;





export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{    
        const response = await APIConnector("POST", CATALOGPAGEDATA_API, {categoryId: categoryId});

        // if response is not present
        if(!response?.data?.success){
            throw new Error("Could not fetch Category page Data");
        }

        result = response?.data;
        
    }
    catch(err){
        console.log("CATALOG_PAGE_DATA_API ERROR...", err);
        toast.error(err.message);
        result = err.response.data;
    }
    toast.dismiss(toastId);
    return result;
}
