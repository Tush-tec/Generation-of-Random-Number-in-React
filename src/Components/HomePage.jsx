import React, { useState, useCallback, useEffect, use, useRef } from "react";

const HomePage = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [character, setCharacter] = useState(false);
  const [randomCharacter, setRandomCharacter] = useState("");

  const generateNumberRef = useRef(null);

  const randomNumGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "1234567890";
    }
    if (character) {
      str += "!@#$%^&*+";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setRandomCharacter(pass);
  }, [length, numberAllowed, character, setRandomCharacter]);

  const copyRandomNumGenerateNumberToClipBoard = useCallback(() => {
    generateNumberRef.current?.select();
    generateNumberRef.current?.setSelectionRange(0, 32);
    window.navigator.clipboard.writeText(randomCharacter);
  }, [randomCharacter]);

  useEffect(() => {
    randomNumGenerate();
  }, [length, numberAllowed, character, randomNumGenerate]);

  return (
    <div className="">
      <div className="text-white text-center text-4xl ">
        Random Number Generator
      </div>

      <div className="w-full max-w-md mx-auto rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3"> Random Character</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={randomCharacter}
            className="outline-none w-full py-1 px-3"
            placeholder="Random-Character"
            readOnly
            ref={generateNumberRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py0.5 shrink-0"
            onClick={copyRandomNumGenerateNumberToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex test-sm gap-x-2">
          <div className="flex items-centre gap-x-1">
            <input
              type="range"
              name=""
              id=""
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />

            <label>Length: {length}</label>
          </div>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Add-Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={character}
            id="numberInput"
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <label htmlFor="CharacterInput">Character</label>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
