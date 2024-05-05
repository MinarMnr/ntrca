import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {callApi, selectApi} from '../reducers/apiSlice';
import {PaginationMeta} from "../models/PaginationMeta";

const useListApi = ({operationId, output}) => {
  
  const {
    loading,
    [output]: response = {
      data: [],
      meta: {}
    }
  } = useSelector(selectApi);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(callApi({
      operationId,
      output: output ?? 'list'
    }));
  }, [dispatch, operationId, output]);
  
  return {
    loading,
    data: response.data,
    meta: PaginationMeta.fromJson(response.meta ?? {})
  };
  
};

export default useListApi;