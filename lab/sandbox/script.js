// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAR2olD6kWsA57Rh7-kwk2VC3Edb5MoCs",
    authDomain: "selvaux.firebaseapp.com",
    projectId: "selvaux",
    storageBucket: "selvaux.firebasestorage.app",
    messagingSenderId: "1091180453709",
    appId: "1:1091180453709:web:f7eb28b0cbb2094fe8a104",
    measurementId: "G-XCRXSZTGY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Constants
const DOC_ID = "main-room-v3"; // The ID of the document where we store state
const DOC_PATH = "mini-project"; // The collection ID

const state = {
    teams: [],
    draggedItem: null,
    sourceTeamId: null,

    // Mobile/Touch State
    touchGhost: null,
    draggedElement: null,
    touchOffsetX: 0,
    touchOffsetY: 0,
    scrollInterval: null,

    // Loading State
    dbConnected: false
};

// Mock data (Fallback / Default)
const ROLES = ['Designer', 'Developer', 'Manager', 'Analyst', 'Researcher'];
const NAMES = [
    'Samuel', 'Praveen', 'Saravanan',
    'Nivash', 'Bala', 'Jeyendra',
    'Jeyakumar', 'Ajith', 'Ajay',      // Team C
    'Vishnu', 'Abu', 'John',           // Team D
    'SelvaUx', 'Surya', 'Gandhi Raj'   // Team E
];
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Start listening to Cloud Firestore
    initCloudVerify();
});

function initCloudVerify() {
    const docRef = doc(db, DOC_PATH, DOC_ID);

    // Realtime Listener
    onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            console.log("Cloud update received!");
            state.teams = docSnap.data().teams;
            state.dbConnected = true;
            renderTeams();
        } else {
            console.log("No cloud data found. initializing default...");
            initDefaultTeams();
            saveState(); // Create the doc
        }
    }, (error) => {
        console.error("Firebase Error:", error);
        // If error (e.g. permission denied or network), fallback could happen here
        // For now, let's alert only on serious failure
        if (error.code === 'permission-denied') {
            alert("Database Permission Denied. Check Firestore Rules!");
        }
    });
}

function initDefaultTeams() {
    state.teams = [];
    // distribute 15 people into 5 teams
    let personId = 1;
    for (let i = 0; i < 5; i++) {
        const team = {
            id: `team-${i}`,
            name: `Team ${String.fromCharCode(65 + i)}`,
            members: [],
            locked: i === 3 || i === 4 // Lock Team D (3) and Team E (4)
        };

        for (let j = 0; j < 3; j++) {
            const nameIndex = (i * 3) + j;
            team.members.push({
                id: `p-${personId++}`,
                name: NAMES[nameIndex],
                role: ROLES[Math.floor(Math.random() * ROLES.length)],
                color: COLORS[Math.floor(Math.random() * COLORS.length)]
            });
        }
        state.teams.push(team);
    }
}

async function saveState() {
    try {
        await setDoc(doc(db, DOC_PATH, DOC_ID), {
            teams: state.teams,
            lastUpdated: new Date()
        });
        console.log("State saved to cloud.");
    } catch (e) {
        console.error("Error saving state:", e);
    }
}

/* --- Rendering (Same as before) --- */
function renderTeams() {
    const container = document.getElementById('teams-container');
    container.innerHTML = '';

    state.teams.forEach(team => {
        const teamEl = document.createElement('div');
        teamEl.className = `team-card ${team.locked ? 'locked-team' : ''}`;
        teamEl.dataset.teamId = team.id;

        if (!team.locked) {
            teamEl.addEventListener('dragover', handleTeamDragOver);
            teamEl.addEventListener('dragleave', handleTeamDragLeave);
            teamEl.addEventListener('drop', handleTeamDrop);
        }

        const header = document.createElement('div');
        header.className = 'team-header';

        const lockIcon = team.locked ? '<i class="fas fa-lock text-red-400" title="Team Locked"></i>' : '';

        header.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="team-name">${team.name}</span>
                ${lockIcon}
            </div>
            <span class="member-count">${team.members.length}/3</span>
        `;
        teamEl.appendChild(header);

        const membersList = document.createElement('div');
        membersList.className = 'flex-grow flex flex-col gap-2';

        team.members.forEach(member => {
            const memberEl = createMemberElement(member, team.locked);
            membersList.appendChild(memberEl);
        });

        teamEl.appendChild(membersList);
        container.appendChild(teamEl);
    });
}

function createMemberElement(member, isLocked) {
    const el = document.createElement('div');
    el.className = `member-card ${isLocked ? 'cursor-not-allowed opacity-80' : ''}`;
    el.draggable = !isLocked;
    el.dataset.id = member.id;

    // Use optional chaining or find to be safe
    const parentTeam = state.teams.find(t => t.members.some(m => m.id === member.id));
    el.dataset.teamId = parentTeam ? parentTeam.id : '';

    el.innerHTML = `
        <div class="member-avatar" style="background-color: ${member.color}">
            ${member.name.charAt(0)}
        </div>
        <div class="member-info">
            <div class="member-name">${member.name}</div>
            <div class="member-role">${member.role}</div>
        </div>
        ${!isLocked ? '<i class="fas fa-grip-lines text-gray-600"></i>' : ''}
    `;

    if (!isLocked) {
        el.addEventListener('dragstart', (e) => handleDragStart(e, member));
        el.addEventListener('dragend', handleDragEnd);
        el.addEventListener('dragover', handleMemberDragOver);
        el.addEventListener('dragleave', handleMemberDragLeave);
        el.addEventListener('drop', handleMemberDrop);

        el.addEventListener('touchstart', (e) => handleTouchStart(e, member), { passive: false });
        el.addEventListener('touchmove', handleTouchMove, { passive: false });
        el.addEventListener('touchend', handleTouchEnd);
        el.addEventListener('touchcancel', handleTouchEnd);
    }

    return el;
}

// --- Logic Handlers (Same logic, calling saveState() at end) ---

function handleDragStart(e, member) { /* ... same as before ... */
    const team = state.teams.find(t => t.members.some(m => m.id === member.id));
    if (team.locked) { e.preventDefault(); return; }
    e.target.classList.add('dragging');
    state.draggedItem = member;
    state.sourceTeamId = team.id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(member));
}

function handleDragEnd(e) { /* ... same ... */
    e.target.classList.remove('dragging');
    document.querySelectorAll('.team-card').forEach(el => el.classList.remove('drag-over'));
    document.querySelectorAll('.member-card').forEach(el => el.classList.remove('member-drag-over'));
    state.draggedItem = null;
    state.sourceTeamId = null;
}

function handleTeamDragOver(e) { /* ... same ... */
    e.preventDefault();
    const team = state.teams.find(t => t.id === e.currentTarget.dataset.teamId);
    if (!team.locked) {
        e.currentTarget.classList.add('drag-over');
        e.dataTransfer.dropEffect = 'move';
    }
}
function handleTeamDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }

function handleTeamDrop(e) {
    e.preventDefault();
    const targetTeamEl = e.currentTarget;
    targetTeamEl.classList.remove('drag-over');
    const targetTeamId = targetTeamEl.dataset.teamId;
    if (!state.draggedItem || !state.sourceTeamId) return;
    if (targetTeamId === state.sourceTeamId) return;
    const targetTeam = state.teams.find(t => t.id === targetTeamId);
    if (targetTeam.locked) return;
    performTeamSwap(state.sourceTeamId, targetTeamId, state.draggedItem);
}

function handleMemberDragOver(e) {
    e.preventDefault(); e.stopPropagation();
    const targetTeam = state.teams.find(t => t.id === e.currentTarget.dataset.teamId);
    if (targetTeam && !targetTeam.locked) {
        if (state.draggedItem && e.currentTarget.dataset.id !== state.draggedItem.id) {
            e.currentTarget.classList.add('member-drag-over');
            e.dataTransfer.dropEffect = 'move';
        }
    }
}
function handleMemberDragLeave(e) { e.stopPropagation(); e.currentTarget.classList.remove('member-drag-over'); }
function handleMemberDrop(e) {
    e.preventDefault(); e.stopPropagation();
    e.currentTarget.classList.remove('member-drag-over');
    if (!state.draggedItem || !state.sourceTeamId) return;
    const targetMemberId = e.currentTarget.dataset.id;
    const targetTeamId = e.currentTarget.dataset.teamId;
    const targetTeam = state.teams.find(t => t.id === targetTeamId);
    if (targetTeam.locked) return;
    if (state.draggedItem.id === targetMemberId) return;
    if (targetTeamId === state.sourceTeamId) return;
    const targetMember = targetTeam.members.find(m => m.id === targetMemberId);
    performDirectSwap(state.sourceTeamId, targetTeamId, state.draggedItem, targetMember);
}

// Touch Handlers copied exactly as before
function handleTouchStart(e, member) {
    e.preventDefault();
    const team = state.teams.find(t => t.members.some(m => m.id === member.id));
    if (team.locked) return;
    const touch = e.touches[0];
    const el = e.currentTarget;
    state.draggedItem = member;
    state.sourceTeamId = team.id;
    state.draggedElement = el;
    el.classList.add('dragging');
    const ghost = el.cloneNode(true);
    ghost.classList.add('drag-ghost');
    ghost.classList.remove('dragging');
    const rect = el.getBoundingClientRect();
    state.touchOffsetX = touch.clientX - rect.left;
    state.touchOffsetY = touch.clientY - rect.top;
    moveGhost(touch.clientX, touch.clientY);
    document.body.appendChild(ghost);
    state.touchGhost = ghost;
}
function handleTouchMove(e) {
    e.preventDefault();
    if (!state.touchGhost) return;
    const touch = e.touches[0];
    moveGhost(touch.clientX, touch.clientY);
    checkAutoScroll(touch.clientY);
    highlightMobileTargets(touch.clientX, touch.clientY);
}
function handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    stopAutoScroll();
    const targetMemberEl = target ? target.closest('.member-card') : null;
    const targetTeamEl = target ? target.closest('.team-card') : null;
    if (targetMemberEl && state.draggedItem) {
        const targetMemberId = targetMemberEl.dataset.id;
        const targetTeamId = targetMemberEl.dataset.teamId;
        const targetTeam = state.teams.find(t => t.id === targetTeamId);
        if (targetTeam && !targetTeam.locked && targetMemberId !== state.draggedItem.id && targetTeamId !== state.sourceTeamId) {
            const targetMember = targetTeam.members.find(m => m.id === targetMemberId);
            performDirectSwap(state.sourceTeamId, targetTeamId, state.draggedItem, targetMember);
        }
    }
    else if (targetTeamEl && state.draggedItem) {
        const targetTeamId = targetTeamEl.dataset.teamId;
        const targetTeam = state.teams.find(t => t.id === targetTeamId);
        if (targetTeam && !targetTeam.locked && targetTeamId !== state.sourceTeamId) {
            performTeamSwap(state.sourceTeamId, targetTeamId, state.draggedItem);
        }
    }
    if (state.touchGhost) state.touchGhost.remove();
    if (state.draggedElement) state.draggedElement.classList.remove('dragging');
    state.touchGhost = null; state.draggedElement = null; state.draggedItem = null; state.sourceTeamId = null;
    clearMobileHighlights();
}
function moveGhost(x, y) { if (state.touchGhost) { state.touchGhost.style.left = `${x - state.touchOffsetX}px`; state.touchGhost.style.top = `${y - state.touchOffsetY}px`; } }
function checkAutoScroll(y) {
    const threshold = 100; const speed = 10;
    if (state.scrollInterval) { clearInterval(state.scrollInterval); state.scrollInterval = null; }
    if (y < threshold) { state.scrollInterval = setInterval(() => { window.scrollBy(0, -speed); }, 16); }
    else if (y > window.innerHeight - threshold) { state.scrollInterval = setInterval(() => { window.scrollBy(0, speed); }, 16); }
}
function stopAutoScroll() { if (state.scrollInterval) { clearInterval(state.scrollInterval); state.scrollInterval = null; } }
function highlightMobileTargets(x, y) {
    clearMobileHighlights();
    const target = document.elementFromPoint(x, y);
    if (!target) return;
    const targetMemberEl = target.closest('.member-card');
    const targetTeamEl = target.closest('.team-card');
    if (targetMemberEl && targetMemberEl !== state.draggedElement) {
        const tObj = state.teams.find(t => t.id === targetMemberEl.dataset.teamId);
        if (tObj && !tObj.locked) targetMemberEl.classList.add('member-drag-over');
    } else if (targetTeamEl) {
        const tObj = state.teams.find(t => t.id === targetTeamEl.dataset.teamId);
        if (tObj && !tObj.locked) targetTeamEl.classList.add('drag-over');
    }
}
function clearMobileHighlights() {
    document.querySelectorAll('.member-drag-over').forEach(el => el.classList.remove('member-drag-over'));
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}

/* --- Logic with SaveState --- */

function performDirectSwap(sourceId, targetId, draggedMember, targetMember) {
    const sourceTeam = state.teams.find(t => t.id === sourceId);
    const targetTeam = state.teams.find(t => t.id === targetId);
    const sourceIndex = sourceTeam.members.findIndex(m => m.id === draggedMember.id);
    const targetIndex = targetTeam.members.findIndex(m => m.id === targetMember.id);
    if (sourceIndex === -1 || targetIndex === -1) return;
    sourceTeam.members[sourceIndex] = targetMember;
    targetTeam.members[targetIndex] = draggedMember;
    console.log(`Directly swapped ${draggedMember.name} with ${targetMember.name}`);
    renderTeams();
    saveState(); // SAVE TO CLOUD
}

function performTeamSwap(sourceId, targetId, member) {
    const sourceTeam = state.teams.find(t => t.id === sourceId);
    const targetTeam = state.teams.find(t => t.id === targetId);
    sourceTeam.members = sourceTeam.members.filter(m => m.id !== member.id);
    let swappedMember = null;
    if (targetTeam.members.length >= 3) {
        swappedMember = targetTeam.members.pop();
    }
    targetTeam.members.push(member);
    if (swappedMember) {
        sourceTeam.members.push(swappedMember);
    }
    renderTeams();
    saveState(); // SAVE TO CLOUD
}
