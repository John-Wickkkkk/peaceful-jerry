import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    name: "Reuse Eligibility",
    checklist: [
      {
        label: "Age of Data",
        desc: "Was the data collected within the last 5 years?",
      },
      {
        label: "Consent Scope",
        desc: "The original consent included permission for future analysis or sharing?",
      },
      {
        label: "Data Ownership & Access",
        desc: "Do you have legal access and permission to use the data?",
      },
      {
        label: "Data Integrity",
        desc: "Is the dataset complete and well-documented?",
      },
      {
        label: "Ethical Fitness",
        desc: "Does the dataset avoid major ethical concerns?",
      },
    ],
  },
  {
    name: "Strategic Fit",
    checklist: [
      {
        label: "Relevant Topic",
        desc: "Does the dataset relate to a current or emerging research area?",
      },
      {
        label: "Research Value",
        desc: "Can this data help answer a new or complementary research question?",
      },
      {
        label: "Richness",
        desc: "Is the dataset rich enough (sample size, variable diversity) for meaningful analysis?",
      },
      {
        label: "Knowledge Gap",
        desc: "Could the data contribute to filling a knowledge gap or inform policy/practice?",
      },
      {
        label: "Stakeholder Benefit",
        desc: "Would other stakeholders benefit from findings from this data?",
      },
    ],
  },
  {
    name: "Readiness",
    checklist: [
      {
        label: "Documentation",
        desc: "Is there a complete codebook or variable guide?",
      },
      {
        label: "De-identification",
        desc: "Are all identifiers removed? No re-identification risk?",
      },
      {
        label: "Data Quality",
        desc: "Has the dataset been checked for missing values, outliers, or errors?",
      },
      {
        label: "Ethics Approval",
        desc: "Is secondary use approved in the original or new ethics application?",
      },
      {
        label: "FAIR/CARE",
        desc: "Does the dataset align with FAIR & CARE principles?",
      },
    ],
  },
  {
    name: "Reuse Pathway",
    checklist: [
      {
        label: "Secondary Analysis",
        desc: "Reanalyze data for new questions or extensions",
      },
      {
        label: "Data Publication / Open Data",
        desc: "Publish in a repository or as open data",
      },
      {
        label: "Knowledge Translation",
        desc: "Policy briefs, infographics, blogs, etc.",
      },
      {
        label: "Teaching/Training",
        desc: "Use as a teaching or workshop dataset",
      },
      {
        label: "Meta-analysis Contribution",
        desc: "Pooled analysis or systematic review",
      },
      { label: "Internal Learning", desc: "Team evaluation, QI, or planning" },
    ],
    multi: true,
  },
  {
    name: "Action Planner",
    fields: [
      { label: "Selected Reuse Option(s)", type: "text" },
      {
        label: "Specific Output(s) (e.g., policy brief, slide deck)",
        type: "text",
      },
      { label: "Responsible Person(s)", type: "text" },
      {
        label: "Required Resources (e.g., repository, ethics clearance)",
        type: "text",
      },
      { label: "Timeline (draft, review, publish)", type: "text" },
      { label: "Risks / Barriers", type: "text" },
      {
        label: "Success Indicators (product, citation, uptake, etc.)",
        type: "text",
      },
      {
        label: "Tracking Method (spreadsheet, meeting notes, etc.)",
        type: "text",
      },
    ],
  },
];

function calcScore(ansArr, stepObj) {
  if (!ansArr) return 0;
  if (stepObj.multi) return ansArr.filter((a) => !!a).length;
  return ansArr.filter((a) => a === "yes").length;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(
    steps.map((s) =>
      s.checklist
        ? Array(s.checklist.length).fill(s.multi ? false : undefined)
        : Array(s.fields.length).fill("")
    )
  );
  const [showSummary, setShowSummary] = useState(false);

  const currentStepObj = steps[step];
  const currentAnswers = answers[step];
  const score = calcScore(currentAnswers, currentStepObj);
  const maxScore = currentStepObj.checklist
    ? currentStepObj.checklist.length
    : currentStepObj.fields.length;

  function handleRadio(i, val) {
    const newAnswers = answers.map((arr) => arr.slice());
    newAnswers[step][i] = val;
    setAnswers(newAnswers);
  }

  function handleMulti(i) {
    const newAnswers = answers.map((arr) => arr.slice());
    newAnswers[step][i] = !newAnswers[step][i];
    setAnswers(newAnswers);
  }

  function handleField(i, val) {
    const newAnswers = answers.map((arr) => arr.slice());
    newAnswers[step][i] = val;
    setAnswers(newAnswers);
  }

  let canNext;
  if (currentStepObj.fields) {
    canNext = true;
  } else if (currentStepObj.multi) {
    canNext = currentAnswers.some((a) => a);
  } else {
    canNext = currentAnswers.every((a) => a !== undefined);
  }

  function handleNext() {
    if (step === steps.length - 1) setShowSummary(true);
    else setStep(step + 1);
  }

  // Tab color helper
  const tabColor = (i) =>
    i === step
      ? {
          background: "#f6fcfa",
          color: "#2bc097",
          borderBottom: "3px solid #2bc097",
        }
      : { color: "#607489", borderBottom: "2px solid #e7e7e7" };

  // Print/save logic
  function handlePrint() {
    window.print();
  }

  // The question mark symbol is a visual cue to match your screenshot.
  const QuestionMark = () => (
    <span
      style={{
        background: "#e9f4fb",
        color: "#2a99c7",
        borderRadius: "50%",
        padding: "1.5px 7px",
        fontSize: 17,
        marginRight: 7,
        fontWeight: 600,
        display: "inline-block",
      }}
    >
      ?
    </span>
  );

  // --- RENDER ---
  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        background: "linear-gradient(120deg, #f8fafc 80%, #e6f2f7 100%)",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #ececec",
          padding: "38px 0 17px 0",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 0.1,
            marginBottom: 6,
          }}
        >
          Data Reuse Navigator
        </div>
        <div style={{ fontSize: 17, color: "#2a4455", opacity: 0.82 }}>
          Help researchers evaluate existing datasets and take concrete
          <br />
          steps to reuse or responsibly archive them.
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0,
          margin: "25px 0 18px 0",
        }}
      >
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <button
              onClick={() => setStep(i)}
              disabled={showSummary}
              style={{
                ...tabColor(i),
                background: i === step ? "#f6fcfa" : "transparent",
                border: "none",
                fontWeight: i === step ? 700 : 500,
                fontSize: 16.5,
                padding: "9px 22px 9px 22px",
                cursor:
                  i === step
                    ? "default"
                    : showSummary
                    ? "not-allowed"
                    : "pointer",
                borderRadius: "10px 10px 0 0",
                transition: "all 0.17s",
              }}
            >
              Step {i + 1}: {s.name}
            </button>
            {i < steps.length - 1 && (
              <div
                style={{ width: 2, height: 17, background: "#e4e7ec" }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Card Area */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          gap: 30,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {/* --- Show summary after last step --- */}
        <AnimatePresence mode="wait">
          {showSummary ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -35 }}
              transition={{ duration: 0.48 }}
              style={{
                background: "#fff",
                borderRadius: 13,
                boxShadow: "0 4px 16px #b1e5f814",
                padding: "38px 36px 32px 36px",
                minWidth: 410,
                maxWidth: 630,
                flex: "1 1 530px",
              }}
            >
              <div
                style={{
                  fontSize: 25,
                  fontWeight: 700,
                  marginBottom: 18,
                  color: "#223c54",
                }}
              >
                ✅ Summary: Your Data Reuse Assessment
              </div>
              {steps.map((s, idx) => (
                <div key={idx} style={{ marginBottom: 22 }}>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#1767b2",
                      marginBottom: 7,
                    }}
                  >
                    Step {idx + 1}: {s.name}
                  </div>
                  {s.checklist ? (
                    <ul
                      style={{
                        marginLeft: 15,
                        fontSize: 15.3,
                        marginBottom: 4,
                      }}
                    >
                      {s.checklist.map((q, i) => (
                        <li key={i} style={{ marginBottom: 6 }}>
                          <b>{q.label}:</b>{" "}
                          <span
                            style={{
                              color:
                                answers[idx][i] === "yes" ||
                                answers[idx][i] === true
                                  ? "#08b470"
                                  : answers[idx][i] === "no"
                                  ? "#c82143"
                                  : "#6a7685",
                              fontWeight: 600,
                            }}
                          >
                            {s.multi
                              ? answers[idx][i]
                                ? "✔️ Selected"
                                : "—"
                              : answers[idx][i] === "yes"
                              ? "Yes"
                              : answers[idx][i] === "no"
                              ? "No"
                              : "Not answered"}
                          </span>
                          <span
                            style={{
                              color: "#9cacc4",
                              fontWeight: 400,
                              marginLeft: 6,
                              fontSize: 13,
                            }}
                          >
                            ({q.desc})
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul
                      style={{
                        marginLeft: 15,
                        fontSize: 15.3,
                        marginBottom: 4,
                      }}
                    >
                      {s.fields.map(
                        (f, i) =>
                          answers[idx][i] && (
                            <li key={i}>
                              <b>{f.label}:</b>{" "}
                              <span style={{ color: "#196874" }}>
                                {answers[idx][i]}
                              </span>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              ))}
              <div style={{ display: "flex", gap: 18, marginTop: 29 }}>
                <button
                  onClick={handlePrint}
                  style={{
                    background: "#2bc097",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 17,
                    padding: "10px 36px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 12px #b2efd733",
                    letterSpacing: "0.01em",
                    transition: "background 0.18s",
                  }}
                >
                  Print / Save as PDF
                </button>
                <button
                  onClick={() => {
                    setShowSummary(false);
                    setStep(0);
                  }}
                  style={{
                    background: "#eaeaea",
                    color: "#333",
                    border: "1.5px solid #c7d6e6",
                    borderRadius: 9,
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: 17,
                  }}
                >
                  Edit Answers
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              style={{
                background: "#fff",
                borderRadius: 13,
                boxShadow: "0 4px 16px #b1e5f814",
                padding: "38px 36px 32px 36px",
                minWidth: 410,
                maxWidth: 570,
                flex: "1 1 530px",
              }}
            >
              <div
                style={{
                  fontSize: 23,
                  fontWeight: 700,
                  marginBottom: 10,
                  color: "#223c54",
                }}
              >
                Step {step + 1}: {steps[step].name}{" "}
                {steps[step].fields ? "Planner" : "Checklist"}
              </div>
              {steps[step].checklist && (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: "0 0.45rem",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        color: "#7da5b2",
                        fontSize: 15,
                        textAlign: "left",
                      }}
                    >
                      <th style={{ fontWeight: 600, paddingBottom: 4 }}>
                        Criteria
                      </th>
                      <th style={{ fontWeight: 600, paddingBottom: 4 }}>
                        {steps[step].multi
                          ? "Select All That Apply"
                          : "Notes / Actions"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {steps[step].checklist.map((q, i) => (
                      <tr
                        key={i}
                        style={{
                          background: "#f9fbfd",
                          borderRadius: 8,
                          boxShadow: "0 1px 5px #d1e7ec16",
                        }}
                      >
                        <td
                          style={{
                            padding: "11px 15px",
                            borderRadius: 9,
                            width: "43%",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: 16.3,
                              fontWeight: 500,
                              color: "#24476c",
                            }}
                          >
                            <QuestionMark />
                            {q.label}
                          </span>
                          <div
                            style={{
                              fontSize: 14.2,
                              marginTop: 2,
                              color: "#778ca7",
                            }}
                          >
                            {q.desc}
                          </div>
                        </td>
                        <td style={{ padding: "11px 12px" }}>
                          {!steps[step].multi ? (
                            <>
                              <label
                                style={{
                                  fontSize: 16,
                                  fontWeight: 500,
                                  marginRight: 14,
                                  cursor: "pointer",
                                }}
                              >
                                <input
                                  type="radio"
                                  checked={currentAnswers[i] === "yes"}
                                  onChange={() => handleRadio(i, "yes")}
                                  style={{
                                    accentColor: "#2bc097",
                                    width: 19,
                                    height: 19,
                                    marginRight: 5,
                                  }}
                                />
                                Yes
                              </label>
                              <label
                                style={{
                                  fontSize: 16,
                                  fontWeight: 500,
                                  cursor: "pointer",
                                }}
                              >
                                <input
                                  type="radio"
                                  checked={currentAnswers[i] === "no"}
                                  onChange={() => handleRadio(i, "no")}
                                  style={{
                                    accentColor: "#ee5555",
                                    width: 19,
                                    height: 19,
                                    marginRight: 5,
                                  }}
                                />
                                No
                              </label>
                            </>
                          ) : (
                            <label
                              style={{
                                fontSize: 16.2,
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={currentAnswers[i]}
                                onChange={() => handleMulti(i)}
                                style={{
                                  accentColor: "#2bc097",
                                  width: 19,
                                  height: 19,
                                  marginRight: 9,
                                }}
                              />
                              Select
                            </label>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {steps[step].fields && (
                <div>
                  <div
                    style={{
                      color: "#5f7a97",
                      fontSize: 15.2,
                      margin: "0 0 14px",
                    }}
                  >
                    (Optional) Fill in what you want to track or leave blank.
                  </div>
                  {steps[step].fields.map((f, i) => (
                    <div key={i} style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 16.3,
                          fontWeight: 500,
                          marginBottom: 3,
                        }}
                      >
                        {f.label}
                      </div>
                      <input
                        type={f.type}
                        value={currentAnswers[i]}
                        onChange={(e) => handleField(i, e.target.value)}
                        placeholder="(Optional)"
                        style={{
                          width: "100%",
                          fontSize: 16,
                          padding: "7.5px 11px",
                          border: "1.5px solid #bfe9db",
                          borderRadius: 7,
                          background: "#f9fcfe",
                          color: "#233b49",
                        }}
                      />
                    </div>
                  ))}
                  ))}
                </div>
              )}
              {/* Navigation */}
              <div style={{ display: "flex", gap: 15, marginTop: 28 }}>
                <button
                  onClick={() => setStep(Math.max(step - 1, 0))}
                  disabled={step === 0}
                  style={{
                    background: "#eaeaea",
                    color: "#333",
                    border: "1.5px solid #c7d6e6",
                    borderRadius: 9,
                    padding: "9px 24px",
                    fontWeight: 500,
                    cursor: step === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canNext}
                  style={{
                    background: "#2bc097",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9,
                    padding: "9px 28px",
                    fontWeight: 600,
                    fontSize: 17,
                    cursor: !canNext ? "not-allowed" : "pointer",
                    transition: "all 0.19s",
                  }}
                >
                  {step === steps.length - 1 ? "Finish & Show Summary" : "Next"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Readiness Score */}
        {!showSummary && (
          <motion.div
            key={score + "-" + step}
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 20,
              duration: 0.48,
            }}
            style={{
              background: "#f6fafa",
              borderRadius: 12,
              boxShadow: "0 2px 10px #aee1f426",
              padding: "37px 28px 28px 28px",
              minWidth: 180,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 17.2,
                fontWeight: 700,
                color: "#1a6970",
                marginBottom: 8,
                letterSpacing: "0.04em",
              }}
            >
              {currentStepObj.checklist ? "Reuse Readiness Score" : "Progress"}
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: score === maxScore ? "#2bc097" : "#8db1a6",
                letterSpacing: "0.02em",
                lineHeight: 1.0,
                margin: "0 0 4px",
              }}
            >
              {score}
            </div>
            <div
              style={{
                fontSize: 15.7,
                color: "#999",
                fontWeight: 500,
              }}
            >
              out of {maxScore}
            </div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0.1 }}
              animate={{ scale: 1.07, opacity: 0.6 }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: score === maxScore ? "#2bc097" : "#e4ebe6",
                margin: "17px auto 0",
                boxShadow: "0 1px 8px #2bc09742",
              }}
            />
          </motion.div>
        )}
      </div>
      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          color: "#b4c9ce",
          fontSize: 14,
          marginTop: 70,
          marginBottom: 20,
          letterSpacing: 0.01,
        }}
      >
        &copy; {new Date().getFullYear()} Research Data Reuse Navigator | Your
        Team
      </div>
    </div>
  );
}
