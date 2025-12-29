import { css } from "@emotion/react";

const fontGenerator = (family: string, weight: number, size: number) => css`
  font-family: ${family};
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: auto;
`;

const font = {
  D1: fontGenerator("JR", 500, 96),
  D2: fontGenerator("JR", 500, 48),
  D3: fontGenerator("JR", 500, 32),

  H1: fontGenerator("JR", 500, 24),
  H2: fontGenerator("JR", 500, 20),
  H3: fontGenerator("JR", 500, 16),
  H4: fontGenerator("JR", 500, 13),

  P1: fontGenerator("JL", 400, 20)
};

export default font;