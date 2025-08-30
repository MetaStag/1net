# ⚡ AI Smart Contract Generator

> 🚀 Generate, audit, and deploy smart contracts from plain English using AI + MetaMask.  

---

## 🌍 Problem
Smart contracts are the backbone of Web3, but writing them requires deep Solidity knowledge.  
This keeps **90% of creators and entrepreneurs locked out of Web3 innovation**.

---

## 💡 Solution
**AI Smart Contract Generator** allows anyone to describe their idea in natural language and instantly get a **secure, deployable contract**.

- 📝 **Plain English → Solidity** (AI-powered)
- 🔨 **Compile** with solc to ABI + Bytecode
- 👛 **Deploy** via MetaMask & ethers.js
- ⚠️ **Security Analyzer** (warns about risky code patterns)
- ⛽ **Gas Estimation** before deployment
- 🖱 **Instant Interaction** with deployed contracts (call functions directly)

---

## 🔄 How It Works
1. **Enter Prompt**  
   `"ERC20 token named HackathonCoin with 1B supply"`
2. **AI Generation**  
   OpenAI generates Solidity contract code.
3. **Compile**  
   Our API compiles the code → returns ABI & bytecode.
4. **Deploy**  
   Connect MetaMask & deploy directly on testnet.
5. **Interact**  
   Call contract functions from our frontend.

---

## 🛠 Tech Stack
- **Frontend**: React.Js + Typescript
- **Backend**: Express.js + Gemini API
- **Compiler**: solc-js + Hardhat
- **Blockchain**: ethers.js + MetaMask (Sepolia testnet)  
- **Hosting**: AWS (Lambda / EC2)  

---
