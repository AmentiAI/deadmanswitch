# The Dead Man's Switch

A Bitcoin Dead Man's Switch that locks UTXOs for 99 years using PSBT (Partially Signed Bitcoin Transaction) with WalletConnect integration.

## 🚀 Features

- **99-Year UTXO Locking**: Lock Bitcoin UTXOs for exactly 99 years using Bitcoin's nLockTime feature
- **PSBT Generation**: Create and download Partially Signed Bitcoin Transactions
- **WalletConnect Integration**: Connect with various cryptocurrency wallets
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Secure**: Uses Bitcoin's native timelock mechanisms for maximum security

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Bitcoin**: bitcoinjs-lib for PSBT operations
- **Wallet**: WalletConnect v2 for wallet integration
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- A WalletConnect Project ID (get one at [cloud.walletconnect.com](https://cloud.walletconnect.com))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd deadmans-switch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure WalletConnect

1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID
4. Open `src/contexts/WalletContext.tsx`
5. Replace `'YOUR_WALLETCONNECT_PROJECT_ID'` with your actual Project ID

### 4. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🔧 Build for Production

```bash
npm run build
npm run preview
```

## 📱 Usage

### 1. Connect Wallet
- Click "Connect Wallet" button
- Scan QR code with your mobile wallet or approve connection in desktop wallet

### 2. Lock UTXO
- Enter the amount of Bitcoin to lock
- Set network fee (recommended: 0.0001 BTC)
- Enter the unlock address (where funds will be sent after 99 years)
- Click "Lock UTXO & Generate PSBT"

### 3. Download PSBT
- The generated PSBT will be displayed
- Click "Download PSBT" to save it locally
- **IMPORTANT**: Keep this PSBT secure - you'll need it to unlock your funds

### 4. Broadcast Transaction
- Sign the PSBT with your wallet
- Broadcast the signed transaction to the Bitcoin network
- Your UTXO is now locked for 99 years!

## 🔒 How It Works

### Technical Details

1. **PSBT Creation**: The application creates a Partially Signed Bitcoin Transaction with:
   - Input UTXOs from your wallet
   - Output to the specified unlock address
   - nLockTime set to current block height + 99 years

2. **Timelock Mechanism**: Uses Bitcoin's native `nLockTime` field:
   - Transaction cannot be included in a block before the specified height
   - Automatically becomes spendable after the lock period

3. **Security**: 
   - Funds remain in your control until the timelock expires
   - No third-party custody involved
   - Uses Bitcoin's consensus rules for maximum security

### Lock Duration Calculation

```typescript
const getLockTime = (): number => {
  const currentBlockHeight = Math.floor(Date.now() / 1000 / 600) // ~6 blocks per hour
  const blocksIn99Years = 99 * 365 * 24 * 6
  return currentBlockHeight + blocksIn99Years
}
```

## ⚠️ Important Notes

- **99-Year Lock**: This is a very long-term commitment. Ensure you understand the implications.
- **PSBT Security**: Keep your generated PSBT secure. Anyone with access can potentially unlock your funds.
- **Network Fees**: Ensure sufficient fees are included for the transaction to be mined.
- **Testnet First**: Consider testing on Bitcoin testnet before using mainnet.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
VITE_BITCOIN_NETWORK=mainnet # or testnet
```

### Customizing Lock Duration

To change the lock duration, modify the `getLockTime` function in `src/contexts/BitcoinContext.tsx`:

```typescript
const getLockTime = (): number => {
  const currentBlockHeight = Math.floor(Date.now() / 1000 / 600)
  const blocksInCustomYears = CUSTOM_YEARS * 365 * 24 * 6
  return currentBlockHeight + blocksInCustomYears
}
```

## 🧪 Testing

### Run Linter

```bash
npm run lint
npm run lint:fix
```

### Test on Testnet

1. Change network to testnet in BitcoinContext
2. Use testnet Bitcoin for testing
3. Verify timelock behavior on testnet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚡ Performance

- **Bundle Size**: Optimized with Vite and tree-shaking
- **Loading**: Lazy loading for better performance
- **Responsive**: Mobile-first design with Tailwind CSS

## 🔗 Links

- [Bitcoin Documentation](https://bitcoin.org/en/developer-documentation)
- [PSBT Specification](https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki)
- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)

## 🆘 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your WalletConnect Project ID is correct
3. Ensure you have sufficient Bitcoin for the transaction
4. Check that your wallet supports the required features

## 🚨 Disclaimer

This software is provided "as is" without warranty. Locking Bitcoin for 99 years is an irreversible action. Always test thoroughly on testnet before using mainnet. The developers are not responsible for any loss of funds.

---

**Built with ❤️ for the Bitcoin community**

