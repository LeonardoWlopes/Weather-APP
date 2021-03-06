import styled from "styled-components/native";

import { colors } from "../../styles/colors";

export const StatusBar = styled.View`
  width: 100%;
  height: 20px;
  background-color: ${colors.azure};
`;

export const Header = styled.View`
  width: 100%;
  height: 80px;
  background-color: ${colors.azure};
  display: flex;
  align-items: center;
  padding: 0px 16px;
  display: flex;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${colors.HeaderColor};
  margin-left: 32px;
`;
