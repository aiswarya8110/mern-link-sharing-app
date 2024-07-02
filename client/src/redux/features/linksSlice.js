import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';
import { v4 as uuidv4 } from 'uuid';

export const deleteLink = createAsyncThunk("link/delete", async(id, { rejectWithValue, dispatch })=>{
    try{
        await axios.delete(BASE_API_URL+`/links/${id}`);
        dispatch(deleteLocalLink(id));
    }catch(error){
        console.log(error);
        if(error?.response?.data === "Cast Error"){
           return dispatch(deleteLocalLink(id));
        }

        return rejectWithValue(error?.response?.data);
    }
})

export const getLinks = createAsyncThunk("links/get", async(_, { rejectWithValue })=>{
    try{
        const { data } = await axios.get(BASE_API_URL+'/links');
        return data;
    }catch(error){
        return rejectWithValue(error?.response.data);
    }
})

export const updateLinks = createAsyncThunk("links/update", async(links, { dispatch, rejectWithValue, getState})=>{
    try{
        const emptyLink = links.find((item)=>item.link === '');
        if(emptyLink){
            return rejectWithValue("Link cannot be empty");
        }

        const filterSamePlatform = (item)=>{
          const filteredLinks = links.filter((el)=>{
                return item.platform === el.platform
            })

           return  filteredLinks.length > 1
        }

        const samePlatformExists = links.some(filterSamePlatform);

        if(samePlatformExists){
            return rejectWithValue("selected platform already exists.");
        }

        await axios.patch(BASE_API_URL+'/links', { links });
        const updatedLinks = getState().links.links;
        setTimeout(()=>{
            dispatch(resetSuccess());
        }, 2000);

        return updatedLinks;

    }catch(error){
        console.log(error);
        return rejectWithValue(err?.response?.data);
    }
})


const linksSlice = createSlice({
    name: "links",
    initialState: {
        links: [],
        isRequestSent: false,
        errorMsg: '',
        success: false,
        isLoading: false,
    },
    reducers: {
        addNewLink: (state, _)=>{
            state.links = [
                {
                    _id: uuidv4(),
                    platform: 'Github',
                    link: '',
                    order: state.links.length === 0 ? 0 : state.links.length 
                },
                ...state.links
            ]
        },
        setLocalLinks: (state, action)=>{
            state.links = action.payload.map((item, index)=>{
                return {
                    ...item,
                    order: index
                } 
            })
        },
        resetSuccess: (state, _)=>{
            state.success = false;
        },
        deleteLocalLink: (state, action)=>{
            state.links = state.links.filter((link)=> link._id !== action.payload)
        }
    },
    extraReducers: (builder)=>{
        // add links
        builder.addCase("links/get/pending", (state, action)=>{
            state.isLoading = true;
        }),
        builder.addCase("links/get/fulfilled", (state, action)=>{
            state.links = action.payload;
            state.isLoading = false;
        }),
        builder.addCase("links/get/rejected", (state, action)=>{
            state.isLoading = false;
        });
        // update links
        builder.addCase("links/update/pending", (state, action)=>{
            state.isRequestSent = true;
            state.errorMsg='';
            state.success = false;
            state.isLoading = true;
        }),
        builder.addCase("links/update/fulfilled", (state, action)=>{
            state.errorMsg='';
            state.isRequestSent=false;
            state.links = action.payload;
            state.success = true;
            state.isLoading = false;
        }),
        builder.addCase("links/update/rejected", (state, action)=>{
            state.errorMsg = action.payload;
            state.isRequestSent = false;
            state.success = false;
            state.isLoading = false;
        }),

        builder.addCase("link/delete/pending", (state, _)=>{
            state.errorMsg = '';
            state.isLoading = true;
        }),

        builder.addCase("link/delete/fulfilled", (state, _)=>{
            state.isLoading = false;
            state.errorMsg = '';
        })

        builder.addCase("link/delete/rejected", (state, action)=>{
            state.errorMsg = action.payload;
            state.isLoading = false;
        })
    }
})


export const { addNewLink, setLocalLinks, resetSuccess, deleteLocalLink } = linksSlice.actions;

export default linksSlice.reducer;




/*

function createAsyncThunk(actionTypePrefix, callback){
    return function thunkActionCreator(){
        callback()
        .then((data)=>{
           dispatch(getLinks.fulfilled(data));
        }).catch((err)=>{
            dispatch(getLinks.rejected(err))
        })
    }
}

const getLinks = createAsyncThunk("links/get", ()=>{
    fetch data ...
})

dispatch(thunkActionCreator())

*/