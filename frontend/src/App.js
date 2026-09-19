<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Casino</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a4a4e;
            color: white;
            overflow-x: hidden;
        }

        .mobile-wrap {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    background: linear-gradient(180deg, #0d7377 0%, #14919b 100%);
    min-height: 100vh;
    position: relative;
    padding-bottom: 70px;
}

        /* Header */
        
        .header {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 12px 15px;
    background: #0a5559;   /* solid background */
    position: sticky;
    top: 0;
    z-index: 100;
}

        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .settings-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff6b6b, #feca57);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .user-details {
            font-size: 12px;
        }

        .user-id {
            background: rgba(0,0,0,0.25);
            padding: 4px 10px;
            border-radius: 12px;
            font-family: monospace;
            font-size: 11px;
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 4px;
        }

        .copy-btn {
            background: #00d9ff;
            border: none;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            font-size: 9px;
            cursor: pointer;
        }

       .balance-box {
    position: absolute;
    right: 15px;
    top: 65px;              /* thoda upar */
    width: 130px;
    height: 35px;
    min-height: 0;
    padding: 7px 8px;
    margin: 0;
    border-radius: 20px;
     display: flex;
    align-items: center;
    justify-content: left;

    background: rgba(0, 80, 85, 0.35);
    border: 1px solid rgba(0, 217, 255, 0.35);

    font-size: 16px;
    color: #ffd700;
}

        .add-btn {
            background: #000;
            border: none;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            color: #ffd700;
            font-size: 20px;
            cursor: pointer;
            position: absolute;
    right: 15px;
        }

        /* Page Container */
        .page {
            display: none;
            animation: fadeIn 0.3s;
        }

        .page.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Home Page */
        .banner {
            margin: 12px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 16px;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }

        .banner h2 {
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 2px;
            line-height: 1.2;
        }

        .banner h2 span {
            color: #ff6b6b;
        }

        .banner-text {
            font-size: 13px;
            color: #a8e6cf;
            margin-top: 8px;
        }

        .reward {
            color: #ffd700;
            font-weight: bold;
            font-size: 18px;
        }

        .banner::after {
            content: '🃏';
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 100px;
            opacity: 0.1;
        }

        .promo {
            margin: 12px;
            height: 110px;
            background: linear-gradient(90deg, #ff6b6b, #feca57);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border: 2px solid rgba(255,255,255,0.3);
        }

        .promo-badge {
            position: absolute;
            left: 10px;
            top: 10px;
            background: #ff4757;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            transform: rotate(-10deg);
        }

        .promo-title {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 4px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        /* Providers */
        .providers {
            display: flex;
            gap: 10px;
            margin: 15px 12px;
            overflow-x: auto;
            padding-bottom: 5px;
        }

        .providers::-webkit-scrollbar {
            display: none;
        }

        .provider {
            flex-shrink: 0;
            text-align: center;
            padding: 12px 20px;
            border-radius: 14px;
            background: rgba(255,255,255,0.1);
            cursor: pointer;
            transition: all 0.3s;
        }

        .provider.active {
            background: rgba(0,217,255,0.25);
            border: 2px solid #00d9ff;
            transform: scale(1.05);
        }

        .prov-icon {
            width: 45px;
            height: 45px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 6px;
        }

        .pg { background: linear-gradient(135deg, #ff6b6b, #ee5a5a); }
        .jili { background: linear-gradient(135deg, #feca57, #ff9f43); color: #000; }
        .pp { background: linear-gradient(135deg, #48dbfb, #0abde3); color: #000; }

        .prov-name {
            font-size: 12px;
            font-weight: 600;
        }

        /* Section */
        .section {
            margin: 20px 12px 12px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-tag {
            background: #333;
            padding: 5px 12px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: bold;
        }

        .section h3 {
            font-size: 18px;
        }

        /* Games Grid */
        .games {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin: 0 12px;
        }

        .game {
            aspect-ratio: 0.85;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            background: linear-gradient(135deg, #2d3436, #636e72);
            transition: transform 0.2s;
        }

        .game:active {
            transform: scale(0.95);
        }

        .game-icon {
            width: 100%;
            height: 65%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
        }

        .game-badge {
            position: absolute;
            top: 6px;
            left: 6px;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 9px;
            font-weight: bold;
        }

        .badge-hot { background: #ff4757; }
        .badge-best { background: #ffa502; color: #000; }
        .badge-new { background: #2ed573; color: #000; }

        .game-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.95));
            padding: 25px 6px 8px;
            text-align: center;
        }

        .game-name {
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .game-provider {
            font-size: 9px;
            color: #aaa;
            margin-top: 2px;
        }

        /* Promotion Page */
        .promo-list {
            padding: 12px;
        }

        .promo-card {
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 15px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .promo-card h3 {
            color: #ffd700;
            margin-bottom: 10px;
            font-size: 18px;
        }

        .promo-card p {
            color: #aaa;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
        }

        .promo-btn {
            background: linear-gradient(135deg, #ff6b6b, #feca57);
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
        }

        /* Wallet Page */
        .wallet-header {
    width: calc(100% - 24px);
    margin: 12px auto;
    padding: 18px;
    border-radius: 16px;
    text-align: center;
    background: rgba(0,0,0,0.2);
        }

        .wallet-balance {
            font-size: 42px;
            font-weight: bold;
            color: #ffd700;
            margin: 10px 0;
        }

        .wallet-actions {
            display: flex;
            gap: 15px;
            padding: 20px;
            justify-content: center;
        }

        .wallet-btn {
            flex: 1;
            padding: 15px;
            border-radius: 12px;
            border: none;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
        }

        .deposit-btn {
            background: linear-gradient(135deg, #2ed573, #7bed9f);
            color: #000;
        }

        .withdraw-btn {
            background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
            color: white;
        }

        .transaction-list {
            padding: 0 15px;
        }

        .transaction-item {
            background: rgba(255,255,255,0.05);
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .tx-type {
            font-size: 14px;
        }

        .tx-date {
            font-size: 11px;
            color: #888;
            margin-top: 4px;
        }

        .tx-amount {
            font-size: 16px;
            font-weight: bold;
        }

        .tx-amount.positive { color: #2ed573; }
        .tx-amount.negative { color: #ff6b6b; }

        /* Support Page */
        .support-header {
            padding: 30px;
            text-align: center;
        }

        .support-header h2 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .support-options {
            padding: 0 15px;
        }

        .support-item {
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 15px;
            cursor: pointer;
        }

        .support-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background: linear-gradient(135deg, #00d9ff, #0099cc);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .support-text h4 {
            font-size: 16px;
            margin-bottom: 4px;
        }

        .support-text p {
            font-size: 12px;
            color: #888;
        }

        /* Profile Page */
        .profile-header {
            padding: 30px;
            text-align: center;
            background: rgba(0,0,0,0.2);
        }

        .profile-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff6b6b, #feca57);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            margin: 0 auto 15px;
        }

        .profile-name {
            font-size: 20px;
            font-weight: bold;
        }

        .profile-id {
            font-size: 12px;
            color: #888;
            margin-top: 5px;
        }

        .profile-menu {
            padding: 20px;
        }

        .menu-item {
            background: rgba(255,255,255,0.05);
            padding: 18px 20px;
            border-radius: 12px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
        }

        .menu-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .menu-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .menu-text {
            font-size: 15px;
        }

        .menu-arrow {
            color: #888;
            font-size: 18px;
        }

        /* Bottom Navigation with SVG Icons */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            max-width: 480px;
            background: rgba(10, 60, 70, 0.98);
            display: flex;
            justify-content: space-around;
            padding: 8px 0;
            border-top: 1px solid rgba(255,255,255,0.1);
        }

        .nav-item {
            text-align: center;
            padding: 5px 12px;
            cursor: pointer;
            opacity: 0.6;
            transition: all 0.3s;
        }

        .nav-item.active {
            opacity: 1;
            color: #00d9ff;
        }

        .nav-icon {
            width: 28px;
            height: 28px;
            margin: 0 auto 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .nav-icon svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .nav-label {
            font-size: 10px;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.85);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal.show {
            display: flex;
        }

        .modal-box {
            background: #1a1a2e;
            padding: 25px;
            border-radius: 16px;
            text-align: center;
            width: 100%;
            max-width: 280px;
        }

        .modal-title {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .modal-text {
            color: #888;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .modal-btn {
            background: #00d9ff;
            border: none;
            padding: 12px 40px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
        }

        .amount-option {
            padding: 16px 8px;
            border-radius: 10px;
            border: 1px solid rgba(0,217,255,0.35);
            background: rgba(0,0,0,0.18);
            color: white;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
        }
        .amount-option.selected {
            background: #00d9ff;
            color: #063f43;
            border-color: #00d9ff;
        }
    </style>
</head>
<body>
    <div class="mobile-wrap">
        <!-- Header -->
        <div class="header">
            <div class="header-top">
                <div class="logo">🎰 WinPro</div>
                <div class="header-right">
                    <button class="settings-btn">🔔</button>
                    <button class="settings-btn">⚙️</button>
                </div>
            </div>
            <div class="user-info">
                <div class="avatar">👤</div>
                <div class="user-details">
                    <div>Welcome Back</div>
                    <div class="user-id">
                        ID: <span id="userId">---</span>
                        <button class="copy-btn" onclick="copyId()">📋</button>
                    </div>
                </div>
            </div>
            <div class="balance-box">
                <span>₹ <span id="balance">0.00</span></span>
                <button class="add-btn" onclick="addMoney()">+</button>
            </div>
        </div>

        <!-- HOME PAGE -->
        <div class="page active" id="page-home">
            <div class="banner">
                <h2><span>N</span>OVICE<br><span>R</span>eward</h2>
                <div class="banner-text">Complete mission get <span class="reward">₹500.00</span></div>
            </div>

            <div class="promo">
                <div class="promo-badge">HOT!</div>
                <div class="promo-title">🃏 3PATTI</div>
            </div>

            <!-- Providers -->
            <div class="providers">
                <div class="provider active" onclick="filterGames('all', this)">
                    <div class="prov-icon" style="background: linear-gradient(135deg, #a29bfe, #6c5ce7);">ALL</div>
                    <div class="prov-name">All</div>
                </div>
                <div class="provider" onclick="filterGames('pg', this)">
                    <div class="prov-icon pg">PG</div>
                    <div class="prov-name">PG</div>
                </div>
                <div class="provider" onclick="filterGames('jili', this)">
                    <div class="prov-icon jili">JILI</div>
                    <div class="prov-name">JILI</div>
                </div>
                <div class="provider" onclick="filterGames('pp', this)">
                    <div class="prov-icon pp">PP</div>
                    <div class="prov-name">PP</div>
                </div>
            </div>

            <div class="section">
                <span class="section-tag" id="currentFilter">ALL</span>
                <h3>Games (<span id="gameCount">21</span>)</h3>
            </div>

            <div class="games" id="gameList"></div>
        </div>

        <!-- PROMOTION PAGE -->
        <div class="page" id="page-promo">
            <div class="promo-list">
                <div class="promo-card">
                    <h3>🎁 Welcome Bonus</h3>
                    <p>Get 100% bonus on your first deposit up to ₹10,000!</p>
                    <button class="promo-btn">Claim Now</button>
                </div>
                <div class="promo-card">
                    <h3>🔥 Daily Cashback</h3>
                    <p>Get 5% cashback on your daily losses!</p>
                    <button class="promo-btn">View Details</button>
                </div>
                <div class="promo-card">
                    <h3>🏆 Weekly Tournament</h3>
                    <p>Win from ₹1,00,000 prize pool every week!</p>
                    <button class="promo-btn">Join Now</button>
                </div>
                <div class="promo-card">
                    <h3>📱 Refer & Earn</h3>
                    <p>Get ₹500 for each friend who joins!</p>
                    <button class="promo-btn">Invite Friends</button>
                </div>
            </div>
        </div>

        <!-- WALLET PAGE -->
        <div class="page" id="page-wallet">
            <div class="wallet-header">
                <div style="font-size: 14px; color: #888;">Total Balance</div>
                <div class="wallet-balance">₹<span id="walletBalance">0.00</span></div>
                <div style="font-size: 12px; color: #2ed573;">+ ₹500.00 this week</div>
            </div>
            <div class="wallet-actions">
                <button class="wallet-btn deposit-btn" onclick="openDepositPage()"> Deposit</button>
                <button class="wallet-btn withdraw-btn" onclick="openWithdrawPage()"> Withdraw</button>
            </div>
            <div style="padding: 0 20px; margin-bottom: 15px;">
                <h3>Recent Transactions</h3>
            </div>
            <div class="transaction-list">
                <div class="transaction-item">
                    <div>
                        <div class="tx-type">Deposit</div>
                        <div class="tx-date">Today, 10:30 AM</div>
                    </div>
                    <div class="tx-amount positive">+₹1,000</div>
                </div>
                <div class="transaction-item">
                    <div>
                        <div class="tx-type">Game Win - Fortune Tiger</div>
                        <div class="tx-date">Yesterday, 8:45 PM</div>
                    </div>
                    <div class="tx-amount positive">+₹2,500</div>
                </div>
                <div class="transaction-item">
                    <div>
                        <div class="tx-type">Game Bet</div>
                        <div class="tx-date">Yesterday, 8:30 PM</div>
                    </div>
                    <div class="tx-amount negative">-₹500</div>
                </div>
            </div>
        </div>


        <!-- ADD FUNDS PAGE -->
        <div class="page" id="page-deposit">
            <div style="padding:12px 15px; background:rgba(0,0,0,0.18); display:flex; align-items:center; justify-content:space-between;">
                <button onclick="switchWalletPage('wallet')" style="background:none;border:none;color:#00d9ff;font-size:28px;cursor:pointer;">‹</button>
                <strong style="font-size:18px;">Add Funds</strong>
                <span style="width:28px;"></span>
            </div>
            <div style="padding:20px;">
                <div style="text-align:center;color:#00d9ff;font-size:18px;font-weight:bold;margin-bottom:16px;">Choose amount</div>
                <div id="depositAmounts" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;"></div>
                <div style="margin-top:22px;background:rgba(0,0,0,0.18);border-radius:12px;padding:16px;">
                    <div style="font-size:12px;color:#888;margin-bottom:7px;">Selected amount</div>
                    <div style="font-size:25px;font-weight:bold;">₹ <span id="depositSelected">0.00</span></div>
                </div>
                <button onclick="confirmDeposit()" class="wallet-btn deposit-btn" style="width:100%;margin-top:18px;">Add Funds</button>
            </div>
        </div>

        <!-- Withdrawal FUNDS PAGE -->
        <div class="page" id="page-withdraw">
            <div style="padding:12px 15px; background:rgba(0,0,0,0.18); display:flex; align-items:center; justify-content:space-between;">
                <button onclick="switchWalletPage('wallet')" style="background:none;border:none;color:#00d9ff;font-size:28px;cursor:pointer;">‹</button>
                <strong style="font-size:18px;">Withdrawal Amount</strong>
                <span style="width:28px;"></span>
            </div>
            <div style="padding:20px;">
                <div style="background:rgba(0,0,0,0.20);border-radius:12px;padding:18px;margin-bottom:20px;">
                    <div style="font-size:13px;color:#888;">Available balance</div>
                    <div style="font-size:28px;color:#00d9ff;font-weight:bold;margin-top:7px;">₹ <span id="withdrawAvailable">0.00</span></div>
                </div>
                <div style="text-align:center;color:#00d9ff;font-size:18px;font-weight:bold;margin-bottom:16px;">Choose amount</div>
                <div id="withdrawAmounts" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;"></div>
                <div style="margin-top:22px;background:rgba(0,0,0,0.18);border-radius:12px;padding:16px;">
                    <div style="font-size:12px;color:#888;margin-bottom:7px;">Selected amount</div>
                    <div style="font-size:25px;font-weight:bold;">₹ <span id="withdrawSelected">0.0</span></div>
                </div>
                <button onclick="confirmWithdraw()" class="wallet-btn withdraw-btn" style="width:100%;margin-top:18px;">Withdrawal Funds</button>
            </div>
        </div>

        <!-- SUPPORT PAGE -->
        <div class="page" id="page-support">
            <div class="support-header">
                <h2>🎧 How can we help?</h2>
                <p style="color: #888; font-size: 14px;">Our team is here 24/7</p>
            </div>
            <div class="support-options">
                <div class="support-item">
                    <div class="support-icon">💬</div>
                    <div class="support-text">
                        <h4>Live Chat</h4>
                        <p>Get instant help</p>
                    </div>
                </div>
                <div class="support-item">
                    <div class="support-icon" style="background: linear-gradient(135deg, #ff6b6b, #ee5a5a);">📧</div>
                    <div class="support-text">
                        <h4>Email Support</h4>
                        <p>support@casino.com</p>
                    </div>
                </div>
                <div class="support-item">
                    <div class="support-icon" style="background: linear-gradient(135deg, #2ed573, #7bed9f);">📱</div>
                    <div class="support-text">
                        <h4>WhatsApp</h4>
                        <p>+91 98765 43210</p>
                    </div>
                </div>
                <div class="support-item">
                    <div class="support-icon" style="background: linear-gradient(135deg, #feca57, #ff9f43);">❓</div>
                    <div class="support-text">
                        <h4>FAQ</h4>
                        <p>Common questions</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- PROFILE PAGE -->
        <div class="page" id="page-profile">
            <div class="profile-header">
                <div class="profile-avatar">👤</div>
                <div class="profile-name">Player <span id="profileUserId">---</span></div>
                <div class="profile-id">ID: <span id="profileFullId">---</span></div>
            </div>
            <div class="profile-menu">
                <div class="menu-item">
                    <div class="menu-left">
                        <div class="menu-icon">📝</div>
                        <div class="menu-text">Edit Profile</div>
                    </div>
                    <div class="menu-arrow">›</div>
                </div>
                <div class="menu-item">
                    <div class="menu-left">
                        <div class="menu-icon">🏦</div>
                        <div class="menu-text">Bank Details</div>
                    </div>
                    <div class="menu-arrow">›</div>
                </div>
                <div class="menu-item">
                    <div class="menu-left">
                        <div class="menu-icon">📜</div>
                        <div class="menu-text">Transaction History</div>
                    </div>
                    <div class="menu-arrow">›</div>
                </div>
            
                <div class="menu-item">
                    <div class="menu-left">
                        <div class="menu-icon">🔒</div>
                        <div class="menu-text">Security Settings</div>
                    </div>
                    <div class="menu-arrow">›</div>
                </div>
                <div class="menu-item">
                    <div class="menu-left">
                        <div class="menu-icon">🎁</div>
                        <div class="menu-text">Refer & Earn</div>
                    </div>
                    <div class="menu-arrow">›</div>
                </div>
                <div class="menu-item" style="margin-top: 20px;">
                    <div class="menu-left">
                        <div class="menu-icon" style="background: #ff4757;">🚪</div>
                        <div class="menu-text" style="color: #ff4757;">Logout</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Navigation -->
        <div class="bottom-nav">
            <div class="nav-item active" onclick="switchPage('home', this)">
                <div class="nav-icon">
                    <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                </div>
                <div class="nav-label">Casino</div>
            </div>
            <div class="nav-item" onclick="switchPage('promo', this)">
                <div class="nav-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div class="nav-label">Promotion</div>
            </div>
            <div class="nav-item" onclick="switchPage('wallet', this)">
                <div class="nav-icon">
                    <svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                </div>
                <div class="nav-label">Wallet</div>
            </div>
            <div class="nav-item" onclick="switchPage('support', this)">
                <div class="nav-icon">
                    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
                </div>
                <div class="nav-label">Support</div>
            </div>
            <div class="nav-item" onclick="switchPage('profile', this)">
                <div class="nav-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div class="nav-label">Profile</div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal" id="modal" onclick="closeModal(event)">
        <div class="modal-box" onclick="event.stopPropagation()">
            <div class="modal-title">🎮 Coming Soon</div>
            <div class="modal-text">Game integration in progress!</div>
            <button class="modal-btn" onclick="hideModal()">OK</button>
        </div>
    </div>

    <script>
        // User ID
        let userId = localStorage.getItem('cid');
       if (!userId) {
    userId = 'PA' + Math.random().toString(36).substr(2, 5).toUpperCase();
    localStorage.setItem('cid', userId);
    localStorage.setItem('cbal', '1000');
}
        
        document.getElementById('userId').textContent = userId;
        document.getElementById('profileUserId').textContent = userId.replace('USER', '');
        document.getElementById('profileFullId').textContent = userId;
        
        let bal = parseFloat(localStorage.getItem('cbal')) || 1000;
        document.getElementById('balance').textContent = bal.toFixed(2);
        document.getElementById('walletBalance').textContent = bal.toFixed(2);
        document.getElementById('withdrawAvailable').textContent = bal.toFixed(2);

        // 21 Games Total (9 PG + 6 JILI + 6 PP)
        const games = [
            // PG Games (9)
            {n: 'Fortune Tiger', i: '🐯', c: '#ff6b6b', p: 'pg', b: 'HOT'},
            {n: 'Fortune Ox', i: '🐮', c: '#feca57', p: 'pg', b: null},
            {n: 'Fortune Rabbit', i: '🐰', c: '#ff9ff3', p: 'pg', b: 'NEW'},
            {n: 'Fortune Mouse', i: '🐭', c: '#ffa502', p: 'pg', b: null},
            {n: 'Fortune Snake', i: '🐍', c: '#2ed573', p: 'pg', b: null},
            {n: 'Dragon Hatch', i: '🐲', c: '#54a0ff', p: 'pg', b: 'BEST'},
            {n: 'Gem Saviour', i: '💎', c: '#5f27cd', p: 'pg', b: null},
            {n: 'Speed Winner', i: '⚡', c: '#00d2d3', p: 'pg', b: null},
            {n: 'Mahjong Ways', i: '🀄', c: '#ff6b6b', p: 'pg', b: null},
            
            // JILI Games (6)
            {n: 'Super Ace', i: '🃏', c: '#ffa502', p: 'jili', b: 'HOT'},
            {n: 'Golden Empire', i: '👑', c: '#ffd700', p: 'jili', b: 'BEST'},
            {n: 'Money Coming', i: '💵', c: '#2ed573', p: 'jili', b: null},
            {n: 'Boxing King', i: '🥊', c: '#ff4757', p: 'jili', b: null},
            {n: 'Crazy 777', i: '7️⃣', c: '#ff6b6b', p: 'jili', b: null},
            {n: 'Jungle King', i: '🦁', c: '#2ed573', p: 'jili', b: 'NEW'},
            
            // PP Games (6)
            {n: 'Gates of Olympus', i: '⚡', c: '#5f27cd', p: 'pp', b: 'HOT'},
            {n: 'Sweet Bonanza', i: '🍬', c: '#ff9ff3', p: 'pp', b: 'BEST'},
            {n: 'Starlight Princess', i: '👸', c: '#feca57', p: 'pp', b: 'NEW'},
            {n: 'Big Bass', i: '🎣', c: '#54a0ff', p: 'pp', b: null},
            {n: 'Wolf Gold', i: '🐺', c: '#ffa502', p: 'pp', b: null},
            {n: 'Madame Destiny', i: '🔮', c: '#a29bfe', p: 'pp', b: null}
        ];

        function loadGames(filter = 'all') {
            const list = document.getElementById('gameList');
            list.innerHTML = '';
            const filtered = filter === 'all' ? games : games.filter(g => g.p === filter);
            
            filtered.forEach(g => {
                const div = document.createElement('div');
                div.className = 'game';
               div.onclick = () => {
    if (g.n === 'Fortune Tiger') {
        window.location.href = 'https://fortune-ox-local-1.onrender.com';
    } else {
        openGame();
    }
};
                div.innerHTML = `
                    ${g.b ? `<div class="game-badge badge-${g.b.toLowerCase()}">${g.b}</div>` : ''}
                    <div class="game-icon" style="background:${g.c}20">${g.i}</div>
                    <div class="game-info">
                        <div class="game-name">${g.n}</div>
                        <div class="game-provider">${g.p.toUpperCase()}</div>
                    </div>
                `;
                list.appendChild(div);
            });
            document.getElementById('gameCount').textContent = filtered.length;
        }

        loadGames();

        function copyId() {
            navigator.clipboard.writeText(userId);
            alert('ID copied: ' + userId);
        }

        function addMoney() {
            const amt = prompt('Enter amount:');
            if (amt && !isNaN(amt)) {
                bal += parseFloat(amt);
                localStorage.setItem('cbal', bal);
                document.getElementById('balance').textContent = bal.toFixed(2);
                document.getElementById('walletBalance').textContent = bal.toFixed(2);
            }
        }

        function filterGames(provider, el) {
            document.querySelectorAll('.provider').forEach(p => p.classList.remove('active'));
            el.classList.add('active');
            document.getElementById('currentFilter').textContent = provider.toUpperCase();
            loadGames(provider);
        }

        function switchPage(page, el) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById('page-' + page).classList.add('active');
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            el.classList.add('active');
        }

        function openGame() {
            document.getElementById('modal').classList.add('show');
        }

        function hideModal() {
            document.getElementById('modal').classList.remove('show');
        }

        function closeModal(e) {
            if (e.target === document.getElementById('modal')) hideModal();
        }


        let selectedDeposit = 0;
        let selectedWithdraw = 0;

        const depositOptions = [200, 500, 1000, 2000, 5000, 10000];
        const withdrawOptions = [100, 1000, 5000, 10000, 20000, 30000, 40000, 50000, 100000];

        function syncBalance() {
            document.getElementById('balance').textContent = bal.toFixed(2);
            document.getElementById('walletBalance').textContent = bal.toFixed(2);
            document.getElementById('withdrawAvailable').textContent = bal.toFixed(2);
            localStorage.setItem('cbal', bal.toFixed(2));
        }

        function renderAmountOptions() {
            const dep = document.getElementById('depositAmounts');
            const wit = document.getElementById('withdrawAmounts');

            dep.innerHTML = depositOptions.map(v =>
                `<button class="amount-option ${selectedDeposit === v ? 'selected' : ''}"
                    onclick="selectDeposit(${v})">₹${v.toLocaleString('en-IN')}.00</button>`
            ).join('');

            wit.innerHTML = withdrawOptions.map(v =>
                `<button class="amount-option ${selectedWithdraw === v ? 'selected' : ''}"
                    onclick="selectWithdraw(${v})">₹${v.toLocaleString('en-IN')}.00</button>`
            ).join('');
        }

        function selectDeposit(amount) {
            selectedDeposit = amount;
            document.getElementById('depositSelected').textContent = amount.toFixed(2);
            renderAmountOptions();
        }

        function selectWithdraw(amount) {
            selectedWithdraw = amount;
            document.getElementById('withdrawSelected').textContent = amount.toFixed(2);
            renderAmountOptions();
        }

        function openDepositPage() {
            selectedDeposit = 0;
            document.getElementById('depositSelected').textContent = '0.00';
            renderAmountOptions();
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById('page-deposit').classList.add('active');
        }

        function openWithdrawPage() {
            selectedWithdraw = 0;
            document.getElementById('withdrawSelected').textContent = '0.00';
            syncBalance();
            renderAmountOptions();
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById('page-withdraw').classList.add('active');
        }

        function switchWalletPage(page) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById('page-' + page).classList.add('active');
            if (page === 'wallet') syncBalance();
        }

        function addTransaction(title, amount, positive) {
            const list = document.getElementById('transactionList');
            const item = document.createElement('div');
            item.className = 'transaction-item';
            item.innerHTML = `
                <div>
                    <div class="tx-type">${title}</div>
                    <div class="tx-date">Just now</div>
                </div>
                <div class="tx-amount ${positive ? 'positive' : 'negative'}">
                    ${positive ? '+' : '-'}₹${amount.toFixed(2)}
                </div>`;
            list.prepend(item);
        }

        function confirmDeposit() {
            if (!selectedDeposit) {
                alert('Please select an amount.');
                return;
            }

            bal += selectedDeposit;
            const amount = selectedDeposit;
            syncBalance();
            addTransaction('Funds Added', amount, true);
            alert('Funds added successfully.');
            switchWalletPage('wallet');
        }

        function confirmWithdraw() {
            if (!selectedWithdraw) {
                alert('Please select an amount.');
                return;
            }

            if (selectedWithdraw > bal) {
                alert('Insufficient balance.');
                return;
            }

            bal -= selectedWithdraw;
            const amount = selectedWithdraw;
            syncBalance();
            addTransaction('Funds Removed', amount, false);
            alert('Funds removal completed.');
            switchWalletPage('wallet');
        }

        function deposit() {
            openDepositPage();
        }

        function withdraw() {
            openWithdrawPage();
        }

        function addMoney() {
            openDepositPage();
        }

        syncBalance();

    function openGamePage() {
    window.location.href = "https://fortune-ox-local-1.onrender.com";
}
    </script>
</body>
</html>
