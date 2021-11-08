import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSamples, fetchSamplesByIds, fetchFamilies } from './sampleSearchAPI';

const initialState = {
  status: 'idle',
  statusFamily: 'idle',
  samples: [],
  families: [],
  showReport: [],
  reportType: 'pharmcat',
  currentStep: 0,
  reviewed: false,
  error: ''
};

export const getSamples = createAsyncThunk(
  'samples/fetchSamples',
  async (query) => {
      const response = await fetchSamples(query, query.idToken);
      if(response instanceof Error){
        throw(response);
      }
      return response;
  }
);

export const getSamplesByIds = createAsyncThunk(
  'samples/fetchSamplesByIds',
  async (query) => {
      const response = await fetchSamplesByIds(query, query.idToken);
      if(response instanceof Error){
        throw(response);
      }
      return response;
  }
);

export const getFamily = createAsyncThunk(
  'samples/fetchFamilies',
  async (query) => {
      const response = await fetchFamilies(query, query.idToken);
      if(response instanceof Error){
        throw(response);
      }
      return response;
  }
);

export const sampleSearchSlice = createSlice({
  name: 'samples',
  initialState,
  reducers: {
		setShowReport: (state,action) => {
			state.showReport = action.payload;
    },
    setReportType: (state,action) => {
			state.reportType = action.payload;
    },
    setError: (state,action) => {
      state.error = action.payload
    },
    setStep: (state, action) => {
      state.currentStep = action.payload
    },
    setReviewed: (state, action) => {
      state.reviewed = action.payload
    },
    setSamples: (state,action) => {
      state.samples = action.payload;
    },
    setStatus: (state, action) =>{
      state.status = action.payload;
    },
    resetState: (state) => {
      state.status = 'idle';
      state.samples = [];
      state.showReport = [];
      state.reportType = 'pharmcat';
      state.currentStep = 0;
      state.reviewed = false;
      state.families = [];
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSamples.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSamples.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.samples = action.payload;
      })
      .addCase(getSamples.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.samples = [];
      })
      .addCase(getSamplesByIds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSamplesByIds.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.samples = action.payload;
      })
      .addCase(getSamplesByIds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.samples = [];
      })
      .addCase(getFamily.pending, (state) => {
        state.statusFamily = 'loading';
      })
      .addCase(getFamily.fulfilled, (state, action) => {
        state.statusFamily = 'fulfilled';
        state.families = action.payload;
      })
      .addCase(getFamily.rejected, (state, action) => {
        state.statusFamily = 'failed';
        state.error = action.error.message;
        state.families = [];
      });
  },
});

export const { setShowReport, setReportType, setError, handleNext, handleBack, handleReset, setStep, setReviewed, setSamples, setStatus, resetState } = sampleSearchSlice.actions;

export const selectSamples = (state) => state.sampleSearch.samples;

export const selectFamily = (state) => state.sampleSearch.families;

export const selectStatus = (state) => state.sampleSearch.status;

export const selectStatusFamily = (state) => state.sampleSearch.statusFamily;

export const selectShowReport = (state) => state.sampleSearch.showReport;

export const selectReportType = (state) => state.sampleSearch.reportType;

export const selectError = (state) => state.sampleSearch.error;

export const selectCurrentStep = (state) => state.sampleSearch.currentStep;

export const selectReviewed = (state) => state.sampleSearch.reviewed;

export default sampleSearchSlice.reducer;
