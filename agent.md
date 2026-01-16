
---

### 🔑 **How to Use This File**
1. **Place in project root**: `your-tax-app/agent.md`
2. **Inject into AI context**:
   - **Cursor**: Enable "Workspace Rules" and reference this file
   - **Continue**: Add to `systemMessage` in config
   - **Claude**: Paste into initial prompt when starting a session
3. **Enforce in PR reviews**: Reject any code violating these rules

---

### 💡 **Why This Works for Tax Software**
- **Prevents catastrophic errors**: Tax miscalculations can trigger IRS penalties
- **Reduces liability**: Clear audit trail of compliance-focused decisions
- **Accelerates development**: Agents know exactly how to handle SSN fields, tax logic, etc.
- **Aligns with Cherny's workflow**: Turns AI into a "tax-specialist agent" rather than generic coder

This `agent.md` transforms your AI from a general-purpose coder into a **compliance-aware tax engineering partner** – critical for financial applications where mistakes have real-world consequences.