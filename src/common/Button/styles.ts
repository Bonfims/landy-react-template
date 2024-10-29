import styled from "styled-components";

export const StyledButton = styled("button")<{ color?: string }>`
  background: ${(p) => p.color || "var(--primary-color)"};
  color: ${(p) => (p.color ? "var(--primary-color)" : "#fff")};
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid #edf3f5;
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgba(var(--primary-color-light-rgb), 0.25);

  &:hover,
  &:active,
  &:focus {
    color: #fff;
    border: 1px solid var(--secondary-color);
    background-color: var(--secondary-color);
  }
`;
