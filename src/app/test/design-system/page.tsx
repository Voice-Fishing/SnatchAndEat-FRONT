/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import font from "@/packages/design-system/font";
import color from "@/packages/design-system/color";

export default function DesignSystemTestPage() {
    return (
        <div
            css={css`
        padding: 40px;
        background-color: ${color.white};
        min-height: 100vh;
      `}
        >
            <h1 css={font.D1}>Design System Test</h1>

            <section css={css`margin-top: 40px;`}>
                <h2 css={font.H1}>Typography</h2>
                <div css={css`display: flex; flex-direction: column; gap: 20px; margin-top: 20px;`}>
                    <div><span css={font.D1}>D1 - Display 1 (96px)</span> - JR 600</div>
                    <div><span css={font.D2}>D2 - Display 2 (48px)</span> - JR 600</div>
                    <div><span css={font.D3}>D3 - Display 3 (32px)</span> - JR 600</div>
                    <div><span css={font.H1}>H1 - Heading 1 (24px)</span> - JR 600</div>
                    <div><span css={font.H2}>H2 - Heading 2 (20px)</span> - JR 600</div>
                    <div><span css={font.H3}>H3 - Heading 3 (16px)</span> - JR 600</div>
                    <div><span css={font.H4}>H4 - Heading 4 (13px)</span> - JR 600</div>
                    <div><span css={font.P1}>P1 - Paragraph 1 (20px)</span> - JL 400</div>
                </div>
            </section>

            <section css={css`margin-top: 40px;`}>
                <h2 css={font.H1}>Colors</h2>
                <div css={css`display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap;`}>
                    <ColorSwatch name="Black" value={color.black} textColor={color.white} />
                    <ColorSwatch name="White" value={color.white} textColor={color.black} border />
                    <ColorSwatch name="Primary" value={color.primary} textColor={color.white} />
                    <ColorSwatch name="Secondary" value={color.secondary} textColor={color.black} />
                </div>
            </section>
        </div>
    );
}

function ColorSwatch({ name, value, textColor, border }: { name: string; value: string; textColor: string, border?: boolean }) {
    return (
        <div
            css={css`
        width: 150px;
        height: 100px;
        background-color: ${value};
        color: ${textColor};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        border: ${border ? `1px solid ${color.black}` : 'none'};
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      `}
        >
            <span css={font.H3}>{name}</span>
            <span css={font.H4}>{value}</span>
        </div>
    );
}
