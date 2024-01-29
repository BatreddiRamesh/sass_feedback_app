import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Suggestions from '../suggestions/Suggestions'

import NewFeedback from '../newFeedback/NewFeedback'
import EditFeedback from '../editFeedback/EditFeedback'
import Roadmap from '../roadmap/Roadmap'
import FeedbackDetail from '../feedbackDetail/FeedbackDetail'

import data1 from "../../data.json"
function Routing() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Suggestions/>} />
        
        <Route path="/feedbackDetail/:id" element={<FeedbackDetail/>} />
        <Route path="/newFeedback" element={<NewFeedback/>} />
        <Route path="/editFeedback/:id" element={<EditFeedback/>} />
        <Route path="/roadmap" element={<Roadmap/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default Routing