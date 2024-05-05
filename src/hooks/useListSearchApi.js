import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {callApi, selectApi} from '../reducers/apiSlice';
import {PaginationMeta} from "../models/PaginationMeta";

const useListSearchApi = ({operationId, output}) => {
  
  const {
    loading,
    [output]: response = {
      datas: [],
      meta2: {}
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
    datas: response.data,
    meta2: PaginationMeta.fromJson(response.meta ?? {})
  };
  
};

export default useListSearchApi;