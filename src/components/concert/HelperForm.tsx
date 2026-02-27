"use client";

import { useState } from "react";

const ACCENT = "#b97fff";

const PIXEL_FONT: React.CSSProperties = {
  fontFamily: "'Mulmaru', 'PFStarDust', monospace",
  WebkitFontSmoothing: "none",
};

const DATES = ["4월 11일(토)", "4월 12일(일)"] as const;
const ROLES = ["카드섹션 배치 도우미", "카드섹션 타이밍 도우미"] as const;

type DateOpt = (typeof DATES)[number];
type RoleOpt = (typeof ROLES)[number];

interface FormState {
  name: string;
  contact: string;
  email: string;
  dates: DateOpt[];
  roles: RoleOpt[];
  seat11: string;
  seat12: string;
}

// 숫자만 추출 후 XXX-XXXX-XXXX 형식으로 자동 포맷
function formatPhone(raw: string): string {
  // 숫자가 아닌 문자 제거 (사용자가 직접 - 를 쓴 경우도 포함)
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(0,0,0,0.45)",
  border: `1.5px solid ${ACCENT}44`,
  borderRadius: "2px",
  padding: "9px 10px",
  color: "rgba(255,255,255,0.9)",
  fontSize: "0.72rem",
  letterSpacing: "0.04em",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Mulmaru', 'PFStarDust', monospace",
};

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <div
      style={{
        ...PIXEL_FONT,
        fontSize: "0.46rem",
        letterSpacing: "0.28em",
        color: `${ACCENT}88`,
        fontWeight: 700,
        marginBottom: "6px",
      }}
    >
      {text}
      {required && (
        <span style={{ color: ACCENT, marginLeft: "4px" }}>*</span>
      )}
    </div>
  );
}

function PixelCheckbox({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "6px 0",
        width: "100%",
        textAlign: "left",
      }}
    >
      <span
        style={{
          width: "14px",
          height: "14px",
          flexShrink: 0,
          border: `2px solid ${checked ? ACCENT : ACCENT + "44"}`,
          background: checked ? `${ACCENT}22` : "transparent",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: checked ? `0 0 6px ${ACCENT}55` : "none",
          transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
        }}
      >
        {checked && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M1.5 4L3.5 6L6.5 2"
              stroke={ACCENT}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        style={{
          ...PIXEL_FONT,
          fontSize: "0.68rem",
          color: checked ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.45)",
          letterSpacing: "0.04em",
          transition: "color 0.15s",
        }}
      >
        {label}
      </span>
    </button>
  );
}

export function HelperForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    contact: "",
    email: "",
    dates: [],
    roles: [],
    seat11: "",
    seat12: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<string[]>([]);

  const isTiming = form.roles.includes("카드섹션 타이밍 도우미");
  const needs11 = isTiming && form.dates.includes("4월 11일(토)");
  const needs12 = isTiming && form.dates.includes("4월 12일(일)");

  const toggleDate = (d: DateOpt) =>
    setForm((prev) => ({
      ...prev,
      dates: prev.dates.includes(d)
        ? prev.dates.filter((x) => x !== d)
        : [...prev.dates, d],
    }));

  const toggleRole = (r: RoleOpt) =>
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(r)
        ? prev.roles.filter((x) => x !== r)
        : [...prev.roles, r],
    }));

  const validate = () => {
    const errs: string[] = [];
    if (!form.name.trim()) errs.push("이름을 입력해 주세요.");
    if (!form.contact.trim()) errs.push("연락처를 입력해 주세요.");
    if (!form.email.trim()) errs.push("메일 주소를 입력해 주세요.");
    if (form.dates.length === 0) errs.push("신청 날짜를 선택해 주세요.");
    if (form.roles.length === 0) errs.push("희망 분야를 선택해 주세요.");
    if (needs11 && !form.seat11.trim()) errs.push("4월 11일 좌석 위치를 입력해 주세요.");
    if (needs12 && !form.seat12.trim()) errs.push("4월 12일 좌석 위치를 입력해 주세요.");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setStatus("loading");

    try {
      const res = await fetch("/api/helper-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          contact: form.contact.trim(),
          email: form.email.trim(),
          dates: form.dates.join(", "),
          roles: form.roles.join(", "),
          seat11: needs11 ? form.seat11.trim() : "",
          seat12: needs12 ? form.seat12.trim() : "",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  /* ── 완료 화면 ── */
  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          padding: "40px 16px",
          textAlign: "center",
          ...PIXEL_FONT,
        }}
      >
        <span style={{ fontSize: "2.2rem" }}>🛸</span>
        <span
          style={{
            fontSize: "0.8rem",
            fontWeight: 800,
            color: ACCENT,
            letterSpacing: "0.15em",
            textShadow: `0 0 12px ${ACCENT}88`,
          }}
        >
          신청 완료!
        </span>
        <span
          style={{
            fontSize: "0.58rem",
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.08em",
            lineHeight: 1.8,
          }}
        >
          헬퍼 신청이 접수되었습니다.{"\n"}확인 후 연락드릴게요!
        </span>
      </div>
    );
  }

  const sectionStyle: React.CSSProperties = { marginBottom: "16px" };
  const boxStyle: React.CSSProperties = {
    background: "rgba(0,0,0,0.3)",
    border: `1.5px solid ${ACCENT}22`,
    borderRadius: "4px",
    padding: "4px 10px",
  };

  return (
    <form onSubmit={handleSubmit} style={{ paddingBottom: "28px" }}>

      {/* ── 이름 ── */}
      <div style={sectionStyle}>
        <FieldLabel text="이름" required />
        <input
          type="text"
          placeholder="엑소엘"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          style={inputStyle}
        />
      </div>

      {/* ── 연락처 ── */}
      <div style={sectionStyle}>
        <FieldLabel text="연락처" required />
        <input
          type="tel"
          placeholder="010-0000-0000"
          value={form.contact}
          onChange={(e) => setForm((p) => ({ ...p, contact: formatPhone(e.target.value) }))}
          style={inputStyle}
        />
      </div>

      {/* ── 메일 주소 ── */}
      <div style={sectionStyle}>
        <FieldLabel text="메일 주소" required />
        <input
          type="email"
          placeholder="exol@email.com"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          style={inputStyle}
        />
      </div>

      {/* ── 신청 날짜 ── */}
      <div style={sectionStyle}>
        <FieldLabel text="신청 날짜" required />
        <div style={boxStyle}>
          {DATES.map((d) => (
            <PixelCheckbox
              key={d}
              checked={form.dates.includes(d)}
              label={d}
              onChange={() => toggleDate(d)}
            />
          ))}
        </div>
      </div>

      {/* ── 희망 분야 ── */}
      <div style={sectionStyle}>
        <FieldLabel text="희망 분야" required />
        <div style={boxStyle}>
          {ROLES.map((r) => (
            <PixelCheckbox
              key={r}
              checked={form.roles.includes(r)}
              label={r}
              onChange={() => toggleRole(r)}
            />
          ))}
        </div>
      </div>

      {/* ── 좌석 위치 (카드섹션 타이밍 도우미 선택 시) ── */}
      {isTiming && (
        <div style={sectionStyle}>
          <FieldLabel text="일자별 좌석 위치" required />
          <div
            style={{
              ...boxStyle,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px 12px",
            }}
          >
            {needs11 && (
              <div>
                <div
                  style={{
                    ...PIXEL_FONT,
                    fontSize: "0.44rem",
                    color: `${ACCENT}66`,
                    letterSpacing: "0.2em",
                    marginBottom: "5px",
                  }}
                >
                  4월 11일(토)
                </div>
                <input
                  type="text"
                  placeholder="예: 1층 4구역 8열"
                  value={form.seat11}
                  onChange={(e) => setForm((p) => ({ ...p, seat11: e.target.value }))}
                  style={inputStyle}
                />
              </div>
            )}
            {needs12 && (
              <div>
                <div
                  style={{
                    ...PIXEL_FONT,
                    fontSize: "0.44rem",
                    color: `${ACCENT}66`,
                    letterSpacing: "0.2em",
                    marginBottom: "5px",
                  }}
                >
                  4월 12일(일)
                </div>
                <input
                  type="text"
                  placeholder="예: 1층 4구역 8열"
                  value={form.seat12}
                  onChange={(e) => setForm((p) => ({ ...p, seat12: e.target.value }))}
                  style={inputStyle}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 유효성 에러 ── */}
      {errors.length > 0 && (
        <div
          style={{
            background: "rgba(255,80,80,0.08)",
            border: "1.5px solid rgba(255,80,80,0.3)",
            borderRadius: "4px",
            padding: "10px 12px",
            marginBottom: "14px",
          }}
        >
          {errors.map((err, i) => (
            <p
              key={i}
              style={{
                ...PIXEL_FONT,
                fontSize: "0.56rem",
                color: "#ff7070",
                letterSpacing: "0.05em",
                marginBottom: i < errors.length - 1 ? "4px" : 0,
              }}
            >
              ▸ {err}
            </p>
          ))}
        </div>
      )}

      {/* ── 서버 에러 ── */}
      {status === "error" && (
        <p
          style={{
            ...PIXEL_FONT,
            fontSize: "0.56rem",
            color: "#ff7070",
            letterSpacing: "0.05em",
            marginBottom: "12px",
          }}
        >
          ▸ 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      {/* ── 제출 버튼 ── */}
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          position: "relative",
          width: "100%",
          border: "none",
          background: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          padding: 0,
          paddingBottom: "4px",
          ...PIXEL_FONT,
        }}
      >
        {/* 버튼 그림자 */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: "2px",
            right: "2px",
            height: "4px",
            backgroundColor: "#4a1a7f",
            borderRadius: "2px 2px 4px 4px",
          }}
        />
        {/* 버튼 면 */}
        <span
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "11px 0",
            backgroundColor: status === "loading" ? `${ACCENT}77` : ACCENT,
            border: `2px solid ${ACCENT}`,
            borderRadius: "4px",
            boxShadow: `0 0 18px ${ACCENT}44, inset 0 2px 0 rgba(255,255,255,0.2)`,
            fontSize: "0.65rem",
            fontWeight: 800,
            letterSpacing: "0.22em",
            color: "#1a0030",
            transition: "background-color 0.15s",
          }}
        >
          {status === "loading" ? "SENDING ..." : "▶ 신청하기"}
        </span>
      </button>
    </form>
  );
}
