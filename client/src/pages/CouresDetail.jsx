import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CustomSideBar from "../components/common/CustomSideBar.jsx";
import Header from "../components/Header/Header.jsx";
import ContentArticle from "../components/CourseDetail/ContentArticle.jsx";
import { updateData } from "../api/apiUtil.js";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/common/Loading.jsx";

import {
  fetchLearnCheck,
  fetchLearnItem,
  setClear,
  setLearnId,
  setLearnIndex,
} from "../redux/features/user/learnSlice.js";
import OxQuiz from "../components/OxQuiz/OxQuiz.jsx";

export default function CouresDetail({ feat }) {
  const [lnb, setLnb] = useState(true); // navi handler
  const { userInfo } = useSelector(state => state.user); // header User
  const { id, learn } = useParams();
  const { loading, learnId, learnChecks } = useSelector(state => state.learn); // learn data

  // ! Current Index
  const dispatch = useDispatch();
  const currentIndex = () => {
    dispatch(setClear()); // data clear
    dispatch(setLearnId(learn)); // set 0 -> LearnId
    const index = learnChecks?.findIndex(el => el.learnId === Number(learn));
    dispatch(setLearnIndex(index));
  };
  useEffect(() => {
    learnChecks && currentIndex();
  }, [id]);

  // ! Get LearnData
  const learnApi = async () => {
    await dispatch(fetchLearnCheck(id)); // get learnCheckes Data
    await dispatch(fetchLearnItem({ learnId, courseId: id })); // getLearnItem Data
  };
  useEffect(() => {
    learnApi();
  }, [id, learnId]);

  // ! Side Menu Handler & Post LearnCheck
  const navigate = useNavigate();
  const handleClickCheck = async (learnId, learnCheckId, index) => {
    dispatch(setLearnIndex(index));
    dispatch(setLearnId(learnId));
    const updateUrl = `/contents/${id}/learns/${learnId}/learnChecks/${learnCheckId}`;
    await updateData({ completed: true }, updateUrl, "patch");
    const pathLearnUrl = `/course/${id}/learn/${learnId}`;
    navigate(pathLearnUrl);
  };

  if (loading) return <Loading />;
  // if (!learnChecks) return <Loading />;
  return (
    <Container>
      <Header course setLnb={setLnb} userInfo={userInfo} />
      <Body>
        {lnb && (
          <CustomSideBar
            courseId={id}
            learnChecks={learnChecks}
            onClickCheck={handleClickCheck}
          />
        )}
        {feat === "content" && (
          <ContentArticle courseId={id} learnChecks={learnChecks} />
        )}
        {feat === "quiz" && <OxQuiz />}
      </Body>
    </Container>
  );
}
const Container = styled.div`
  background-color: ${({ theme }) => theme.white};
  min-height: 100vh;
`;
const Body = styled.section`
  display: flex;
  padding-top: 60px;
`;
