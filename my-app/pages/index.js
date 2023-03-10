import Head from "next/head";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";

import Link from "next/link";
import nextBase64 from "next-base64";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("You will see output here");
  const [userInputSelect, setUserInputSelect] = useState("");
  const [checked, setChecked] = useState(false);
  const [apiOutputForRemix, setApiOutputForRemix] = useState("");

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  const onSelectOption = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const OpenInRemixButton = ({ fileUrl, fileCode }) => {
    const fileCodeBase64 = nextBase64.encode(fileCode);

    return (
      <Link
        href={fileUrl}
        as={`https://remix.ethereum.org?code=${fileCodeBase64}`}
        prefetch={false}
        passHref
        legacyBehavior
      >
        <a
          data-url={fileUrl}
          target="_blank"
          className="btn btn-outline-success my-2 my-sm-0 float-right"
          data-content={fileCodeBase64}
        >
          Open in Remix
        </a>
      </Link>
    );
  };

  const callGenerateEndpoint = async () => {
    setApiOutput(`Please Wait ....`);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput, checked }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutputForRemix(output.text);

    const formattedText = output.text.replace(/\n/g, "<br>");
    const sanitizedOutput = sanitizeHtml(formattedText);

    setApiOutput(`${sanitizedOutput}`);
  };

  return (
    <>
      <main
        className="px-2 py-3 my-3 container"
        style={{ border: "0px solid #ccc", background: "#fff" }}
      >
        <Head>
          <title>Create Solidity Templates and functions</title>
          <meta name="description" content="Create Solidity templates and functions" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="row">
          <div
            className="col-md-6 text-left"
            style={{
              border: "1px solid #ccc",
              background: "#eee",
              marginLeft: "0px",
            }}
          >
            <div className="mx-4 px-4 py-5 my-5 text-left flex-grow-1">
              <h2 className="">
                Create Solidity Templates and functions ???? ONLY A TOOL, FOR
                TEMPLATES/SPECIFIC FUNCTION CREATION: YOU ARE THE DEV NOT THE AI
                ????
              </h2>
              <br></br>
              <div className="">
                <p className="lead mb-4">
                  <select
                    className="form-control form-control-lg"
                    value={userInputSelect}
                    onChange={onSelectOption}
                  >
                    <option>Select Solidity templates and functions</option>
                    <option value="NFT">NFT</option>
                    <option value="NFT with Royalty">NFT with Royalty</option>
                    <option value="PaymentSplitter">PaymentSplitter</option>
                    <option value="Mempool watcher bot">
                      Mempool watcher Bot
                    </option>
                    <option value="Staking rewards">Staking Rewards</option>
                    <option value="Pausable">Pausable</option>
                    <option value="ReentrancyGuard">ReentrancyGuard</option>
                    <option value="Uniswap">Uniswap</option>
                    <option value="Auction">Auction</option>
                    <option value="Mev Bot">Mev Bot</option>
                    <option value="FlashLoan Arbitrage Bot">
                      FlashLoan Arbitrage Bot
                    </option>
                    <option value="SoulBound NFT collection">
                      SoulBound NFT collection
                    </option>
                    <option value="Liquidity Bot">Liquidity Bot</option>
                  </select>
                  <br></br>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    or
                  </div>
                  <br></br>
                  <textarea
                    name=""
                    className="form-control"
                    rows={4}
                    placeholder="e.g create specific functions for your contract or to create a basic template for your contract"
                    value={userInput}
                    onChange={onUserChangedText}
                  ></textarea>
                  <br></br>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                  ></input>{" "}
                  <i>Use OpenZeppelin</i>
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg px-4 gap-3"
                    onClick={callGenerateEndpoint}
                  >
                    Create
                  </button>
                </div>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  Powered by YOU & OpenAI GPT-3
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-6"
            style={{
              border: "0px solid #000",
              background: "#fff",
              marginLeft: "0px",
            }}
          >
            <nav
              className="navbar navbar-light"
              style={{
                background: "#000",
                padding: "13px",
                paddingBottom: "0px",
              }}
            >
              <OpenInRemixButton
                fileUrl="https://remix.ethereum.org/#version=soljson-v0.7.7+commit.9e61f92b.js&optimize=false&gist=e2e5c1b5e6fb5c6f9b8d5f6b5d2ebeb1"
                fileCode={apiOutputForRemix}
              />
            </nav>

            <div
              className="text-left flex-grow-1"
              style={{
                border: "1px solid #000",
                background: "#000",
                color: "#39FF14",
              }}
            >
              <div>
                {apiOutput && (
                  <div className="output">
                    <div className="output-content">
                      <pre>
                        <code>
                          <div
                            style={{ padding: "10px" }}
                            dangerouslySetInnerHTML={{
                              __html: apiOutput,
                            }}
                          ></div>
                        </code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
