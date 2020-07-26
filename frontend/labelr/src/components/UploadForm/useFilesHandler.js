import React, { useReducer } from 'react'


const LOADED = 'LOADED'
const INIT = 'INIT'
const PENDING = 'PENDING'
const FILES_UPLOADED = 'FILES_UPLOADED'
const UPLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
  files: [],
  pending: [],
  next: null,
  uploading: false,
  uploaded: {},
  status: 'idle',
}

const useFileHandlers = () => {
  return {}
}

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const useFileHandlers = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {}
}

export default useFileHandlers

export default useFileHandlers