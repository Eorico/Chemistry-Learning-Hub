let protons = 0, neutrons = 0, electrons = 0;
let scene, camera, renderer, nucleusGroup, electronGroup;
let scene2, camera2, renderer2, moleculeGroup;
let protonMeshes = [], neutronMeshes = [], electronMeshes = [];
let currentMolecule = null;

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationVelocity = { x: 0, y: 0 };
let autoRotate = true;
let lastInteractionTime = Date.now();
let autoRotateTimeout = null;

const elements = {
     0: { symbol: '?', name: 'Build an atom', weight: 0 },
    1: { symbol: 'H', name: 'Hydrogen', weight: 1.008 },
    2: { symbol: 'He', name: 'Helium', weight: 4.0026 },
    3: { symbol: 'Li', name: 'Lithium', weight: 6.94 },
    4: { symbol: 'Be', name: 'Beryllium', weight: 9.0122 },
    5: { symbol: 'B', name: 'Boron', weight: 10.81 },
    6: { symbol: 'C', name: 'Carbon', weight: 12.011 },
    7: { symbol: 'N', name: 'Nitrogen', weight: 14.007 },
    8: { symbol: 'O', name: 'Oxygen', weight: 15.999 },
    9: { symbol: 'F', name: 'Fluorine', weight: 18.998 },
    10: { symbol: 'Ne', name: 'Neon', weight: 20.180 },
    11: { symbol: 'Na', name: 'Sodium', weight: 22.990 },
    12: { symbol: 'Mg', name: 'Magnesium', weight: 24.305 },
    13: { symbol: 'Al', name: 'Aluminum', weight: 26.982 },
    14: { symbol: 'Si', name: 'Silicon', weight: 28.085 },
    15: { symbol: 'P', name: 'Phosphorus', weight: 30.974 },
    16: { symbol: 'S', name: 'Sulfur', weight: 32.06 },
    17: { symbol: 'Cl', name: 'Chlorine', weight: 35.45 },
    18: { symbol: 'Ar', name: 'Argon', weight: 39.948 },
    19: { symbol: 'K', name: 'Potassium', weight: 39.098 },
    20: { symbol: 'Ca', name: 'Calcium', weight: 40.078 },
    21: { symbol: 'Sc', name: 'Scandium', weight: 44.956 },
    22: { symbol: 'Ti', name: 'Titanium', weight: 47.867 },
    23: { symbol: 'V', name: 'Vanadium', weight: 50.942 },
    24: { symbol: 'Cr', name: 'Chromium', weight: 51.996 },
    25: { symbol: 'Mn', name: 'Manganese', weight: 54.938 },
    26: { symbol: 'Fe', name: 'Iron', weight: 55.845 },
    27: { symbol: 'Co', name: 'Cobalt', weight: 58.933 },
    28: { symbol: 'Ni', name: 'Nickel', weight: 58.693 },
    29: { symbol: 'Cu', name: 'Copper', weight: 63.546 },
    30: { symbol: 'Zn', name: 'Zinc', weight: 65.38 },
    31: { symbol: 'Ga', name: 'Gallium', weight: 69.723 },
    32: { symbol: 'Ge', name: 'Germanium', weight: 72.63 },
    33: { symbol: 'As', name: 'Arsenic', weight: 74.922 },
    34: { symbol: 'Se', name: 'Selenium', weight: 78.971 },
    35: { symbol: 'Br', name: 'Bromine', weight: 79.904 },
    36: { symbol: 'Kr', name: 'Krypton', weight: 83.798 },
    37: { symbol: 'Rb', name: 'Rubidium', weight: 85.468 },
    38: { symbol: 'Sr', name: 'Strontium', weight: 87.62 },
    39: { symbol: 'Y', name: 'Yttrium', weight: 88.906 },
    40: { symbol: 'Zr', name: 'Zirconium', weight: 91.224 },
    41: { symbol: 'Nb', name: 'Niobium', weight: 92.906 },
    42: { symbol: 'Mo', name: 'Molybdenum', weight: 95.95 },
    43: { symbol: 'Tc', name: 'Technetium', weight: 98 },
    44: { symbol: 'Ru', name: 'Ruthenium', weight: 101.07 },
    45: { symbol: 'Rh', name: 'Rhodium', weight: 102.91 },
    46: { symbol: 'Pd', name: 'Palladium', weight: 106.42 },
    47: { symbol: 'Ag', name: 'Silver', weight: 107.87 },
    48: { symbol: 'Cd', name: 'Cadmium', weight: 112.41 },
    49: { symbol: 'In', name: 'Indium', weight: 114.82 },
    50: { symbol: 'Sn', name: 'Tin', weight: 118.71 },
    51: { symbol: 'Sb', name: 'Antimony', weight: 121.76 },
    52: { symbol: 'Te', name: 'Tellurium', weight: 127.60 },
    53: { symbol: 'I', name: 'Iodine', weight: 126.90 },
    54: { symbol: 'Xe', name: 'Xenon', weight: 131.29 },
    55: { symbol: 'Cs', name: 'Cesium', weight: 132.91 },
    56: { symbol: 'Ba', name: 'Barium', weight: 137.33 },
    57: { symbol: 'La', name: 'Lanthanum', weight: 138.91 },
    58: { symbol: 'Ce', name: 'Cerium', weight: 140.12 },
    59: { symbol: 'Pr', name: 'Praseodymium', weight: 140.91 },
    60: { symbol: 'Nd', name: 'Neodymium', weight: 144.24 },
    61: { symbol: 'Pm', name: 'Promethium', weight: 145 },
    62: { symbol: 'Sm', name: 'Samarium', weight: 150.36 },
    63: { symbol: 'Eu', name: 'Europium', weight: 151.96 },
    64: { symbol: 'Gd', name: 'Gadolinium', weight: 157.25 },
    65: { symbol: 'Tb', name: 'Terbium', weight: 158.93 },
    66: { symbol: 'Dy', name: 'Dysprosium', weight: 162.50 },
    67: { symbol: 'Ho', name: 'Holmium', weight: 164.93 },
    68: { symbol: 'Er', name: 'Erbium', weight: 167.26 },
    69: { symbol: 'Tm', name: 'Thulium', weight: 168.93 },
    70: { symbol: 'Yb', name: 'Ytterbium', weight: 173.05 },
    71: { symbol: 'Lu', name: 'Lutetium', weight: 174.97 },
    72: { symbol: 'Hf', name: 'Hafnium', weight: 178.49 },
    73: { symbol: 'Ta', name: 'Tantalum', weight: 180.95 },
    74: { symbol: 'W', name: 'Tungsten', weight: 183.84 },
    75: { symbol: 'Re', name: 'Rhenium', weight: 186.21 },
    76: { symbol: 'Os', name: 'Osmium', weight: 190.23 },
    77: { symbol: 'Ir', name: 'Iridium', weight: 192.22 },
    78: { symbol: 'Pt', name: 'Platinum', weight: 195.08 },
    79: { symbol: 'Au', name: 'Gold', weight: 196.97 },
    80: { symbol: 'Hg', name: 'Mercury', weight: 200.59 },
    81: { symbol: 'Tl', name: 'Thallium', weight: 204.38 },
    82: { symbol: 'Pb', name: 'Lead', weight: 207.2 },
    83: { symbol: 'Bi', name: 'Bismuth', weight: 208.98 },
    84: { symbol: 'Po', name: 'Polonium', weight: 209 },
    85: { symbol: 'At', name: 'Astatine', weight: 210 },
    86: { symbol: 'Rn', name: 'Radon', weight: 222 },
    87: { symbol: 'Fr', name: 'Francium', weight: 223 },
    88: { symbol: 'Ra', name: 'Radium', weight: 226 },
    89: { symbol: 'Ac', name: 'Actinium', weight: 227 },
    90: { symbol: 'Th', name: 'Thorium', weight: 232.04 },
    91: { symbol: 'Pa', name: 'Protactinium', weight: 231.04 },
    92: { symbol: 'U', name: 'Uranium', weight: 238.03 },
    93: { symbol: 'Np', name: 'Neptunium', weight: 237 },
    94: { symbol: 'Pu', name: 'Plutonium', weight: 244 },
    95: { symbol: 'Am', name: 'Americium', weight: 243 },
    96: { symbol: 'Cm', name: 'Curium', weight: 247 },
    97: { symbol: 'Bk', name: 'Berkelium', weight: 247 },
    98: { symbol: 'Cf', name: 'Californium', weight: 251 },
    99: { symbol: 'Es', name: 'Einsteinium', weight: 252 },
    100: { symbol: 'Fm', name: 'Fermium', weight: 257 },
    101: { symbol: 'Md', name: 'Mendelevium', weight: 258 },
    102: { symbol: 'No', name: 'Nobelium', weight: 259 },
    103: { symbol: 'Lr', name: 'Lawrencium', weight: 266 },
    104: { symbol: 'Rf', name: 'Rutherfordium', weight: 267 },
    105: { symbol: 'Db', name: 'Dubnium', weight: 268 },
    106: { symbol: 'Sg', name: 'Seaborgium', weight: 271 },
    107: { symbol: 'Bh', name: 'Bohrium', weight: 270 },
    108: { symbol: 'Hs', name: 'Hassium', weight: 277 },
    109: { symbol: 'Mt', name: 'Meitnerium', weight: 276 },
    110: { symbol: 'Ds', name: 'Darmstadtium', weight: 281 },
    111: { symbol: 'Rg', name: 'Roentgenium', weight: 282 },
    112: { symbol: 'Cn', name: 'Copernicium', weight: 285 },
    113: { symbol: 'Nh', name: 'Nihonium', weight: 286 },
    114: { symbol: 'Fl', name: 'Flerovium', weight: 289 },
    115: { symbol: 'Mc', name: 'Moscovium', weight: 288 },
    116: { symbol: 'Lv', name: 'Livermorium', weight: 293 },
    117: { symbol: 'Ts', name: 'Tennessine', weight: 294 },
    118: { symbol: 'Og', name: 'Oganesson', weight: 294 }
};

const lessonLinks = document.querySelectorAll('.sidebar a');
const elementInput = document.getElementById('ElementInput');
const equationInput = document.getElementById('equationInput');
const overlay = document.createElement('div');

function updateRightSidebar(tab) {
    const controlPanel = document.getElementById('rightControlsPanel');
    const chemicalCalculator = document.getElementById('rightEquationsPanel');

    if (tab === 'build') {
        controlPanel.style.display = 'block';
        chemicalCalculator.style.display = 'none';
    } else if (tab === 'equation') {
        controlPanel.style.display = 'none';
        chemicalCalculator.style.display = 'block';
    }
}


function initThreeJS() {
    // Initialize first viewer (atom builder)
    const container = document.getElementById('viewer3D');
    if (!container) {
        console.error('viewer3D container not found');
        return;
    }
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xA6A9B6);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    nucleusGroup = new THREE.Group();
    scene.add(nucleusGroup);

    electronGroup = new THREE.Group();
    scene.add(electronGroup);

    // Initialize second viewer (molecule viewer)
    const container2 = document.getElementById('viewer3D2');
    if (!container2) {
        console.error('viewer3D2 container not found');
        return;
    }
    
    scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0xA6A9B6);

    camera2 = new THREE.PerspectiveCamera(75, container2.clientWidth / container2.clientHeight, 0.1, 1000);
    camera2.position.z = 15;

    renderer2 = new THREE.WebGLRenderer({ antialias: true });
    renderer2.setSize(container2.clientWidth, container2.clientHeight);
    container2.appendChild(renderer2.domElement);

    const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.6);
    scene2.add(ambientLight2);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
    pointLight2.position.set(10, 10, 10);
    scene2.add(pointLight2);

    moleculeGroup = new THREE.Group();
    scene2.add(moleculeGroup);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    if (!autoRotate && !isDragging && Date.now() - lastInteractionTime > 3000) {
        autoRotate = true;
        rotationVelocity = { x: 0, y: 0 };
    }
    
    if (autoRotate && !isDragging) {
        if (nucleusGroup) {
            nucleusGroup.rotation.y += 0.005;
        }
        if (electronGroup) {
            electronGroup.rotation.y += 0.01;
            electronGroup.rotation.x += 0.005;
        }
        if (moleculeGroup) {
            moleculeGroup.rotation.y += 0.01;
            moleculeGroup.rotation.x += 0.005;
        }
    }
    
    if (!isDragging && !autoRotate) {
        if (nucleusGroup) {
            nucleusGroup.rotation.y += rotationVelocity.y;
            nucleusGroup.rotation.x += rotationVelocity.x;
        }
        if (electronGroup) {
            electronGroup.rotation.y += rotationVelocity.y;
            electronGroup.rotation.x += rotationVelocity.x;
        }
        
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
    if (renderer2 && scene2 && camera2) {
        renderer2.render(scene2, camera2);
    }
}

function addParticle(type) {
    if (type === 'proton') {
        protons++;
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xff6b6b, emissive: 0xff0000, emissiveIntensity: 0.2 });
        const sphere = new THREE.Mesh(geometry, material);
        const angle = (protonMeshes.length / Math.max(1, protons + neutrons)) * Math.PI * 2;
        sphere.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, Math.random() - 0.5);
        nucleusGroup.add(sphere);
        protonMeshes.push(sphere);
    } else if (type === 'neutron') {
        neutrons++;
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xadb5bd, emissive: 0x555555, emissiveIntensity: 0.2 });
        const sphere = new THREE.Mesh(geometry, material);
        const angle = (neutronMeshes.length / Math.max(1, protons + neutrons)) * Math.PI * 2;
        sphere.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, Math.random() - 0.5);
        nucleusGroup.add(sphere);
        neutronMeshes.push(sphere);
    } else if (type === 'electron') {
        electrons++;
        const geometry = new THREE.SphereGeometry(0.3, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x4ecdc4, emissive: 0x00ffff, emissiveIntensity: 0.3 });
        const sphere = new THREE.Mesh(geometry, material);
        const shellRadius = 5 + Math.floor((electrons - 1) / 8) * 3;
        const angle = ((electrons - 1) % 8) * (Math.PI / 4);
        sphere.position.set(Math.cos(angle) * shellRadius, Math.sin(angle) * shellRadius, (Math.random() - 0.5) * 2);
        electronGroup.add(sphere);
        electronMeshes.push(sphere);
    }
    updateDisplay();
}

function removeParticle(type) {
    if (type === 'proton' && protons > 0) {
        protons--;
        const mesh = protonMeshes.pop();
        if (mesh) {
            nucleusGroup.remove(mesh);
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) mesh.material.dispose();
        }
    } else if (type === 'neutron' && neutrons > 0) {
        neutrons--;
        const mesh = neutronMeshes.pop();
        if (mesh) {
            nucleusGroup.remove(mesh);
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) mesh.material.dispose();
        }
    } else if (type === 'electron' && electrons > 0) {
        electrons--;
        const mesh = electronMeshes.pop();
        if (mesh) {
            electronGroup.remove(mesh);
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) mesh.material.dispose();
        }
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('protonCount').textContent = protons;
    document.getElementById('neutronCount').textContent = neutrons;
    document.getElementById('electronCount').textContent = electrons;

    const element = elements[protons] || { symbol: '?', name: 'Unknown', weight: 0 };
    document.getElementById('atomicNumDisplay').textContent = protons;
    document.getElementById('elementSymbol').textContent = element.symbol;
    document.getElementById('elementNameFull').textContent = protons === 0 ? '---' : element.name;
    document.getElementById('elementWeight').textContent = protons === 0 ? '0.00' : element.weight.toFixed(2);

    const charge = protons - electrons;
    document.getElementById('charge').textContent = charge > 0 ? `+${charge}` : charge;

    let atomType = 'Neutral';
    if (charge > 0) atomType = 'Cation (+)';
    else if (charge < 0) atomType = 'Anion (-)';
    document.getElementById('atomType').textContent = atomType;
}

function resetAtom() {
    protons = neutrons = electrons = 0;
    
    protonMeshes.forEach(mesh => {
        nucleusGroup.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
    });
    neutronMeshes.forEach(mesh => {
        nucleusGroup.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
    });
    electronMeshes.forEach(mesh => {
        electronGroup.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
    });
    
    protonMeshes = [];
    neutronMeshes = [];
    electronMeshes = [];
    
    updateDisplay();
}

function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    if (tab === 'build') {
        tabs[0].classList.add('active');
        document.getElementById('buildTab').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('equationTab').classList.add('active');
        
        // Re-render the molecule viewer when switching to equation tab
        if (renderer2 && scene2 && camera2) {
            setTimeout(() => {
                const container2 = document.getElementById('viewer3D2');
                if (container2) {
                    camera2.aspect = container2.clientWidth / container2.clientHeight;
                    camera2.updateProjectionMatrix();
                    renderer2.setSize(container2.clientWidth, container2.clientHeight);
                    renderer2.render(scene2, camera2);
                }
            }, 100);
        }
    }

    updateRightSidebar(tab);
}

function parseChemicalFormula(formula) {
    const atoms = {};
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match;
    
    while ((match = regex.exec(formula)) !== null) {
        const element = match[1];
        const count = match[2] ? parseInt(match[2]) : 1;
        atoms[element] = (atoms[element] || 0) + count;
    }
    
    return atoms;
}

function calculateEquation() {
    const input = document.getElementById('equationInput').value.trim();
    const resultDiv = document.getElementById('equationResult');
    const balancedEq = document.getElementById('balancedEquation');
    const moleculeDisplay = document.getElementById('moleculeDisplay');
    const badgesDiv = document.getElementById('equationBadges');
    
    if (!input) {
        alert('Please enter a chemical equation!');
        return;
    }
    
    const parts = input.split('=');
    if (parts.length !== 2) {
        alert('Please use format: reactants = products');
        return;
    }
    
    const reactants = parts[0].trim();
    const products = parts[1].trim();
    
    balancedEq.textContent = input;
    resultDiv.classList.add('show');
    
    const productMolecules = products.split('+').map(m => m.trim());
    moleculeDisplay.innerHTML = '';
    
    productMolecules.forEach(molecule => {
        const coef = molecule.match(/^(\d+)/);
        const coefficient = coef ? coef[1] : '1';
        const formula = molecule.replace(/^\d+/, '').trim();
        
        const card = document.createElement('div');
        card.className = 'molecule-card';
        card.innerHTML = `
            <div class="molecule-formula">${formula}</div>
            <div class="molecule-count">${coefficient} molecule${coefficient !== '1' ? 's' : ''}</div>
        `;
        moleculeDisplay.appendChild(card);
    });
    
    const atoms = parseChemicalFormula(products.replace(/\d+/g, '').replace(/\+/g, ''));
    const atomCount = Object.keys(atoms).length;
    const reactionType = determineReactionType(reactants, products);
    
    badgesDiv.innerHTML = `
        <div class="badge">${atomCount} Element${atomCount !== 1 ? 's' : ''}</div>
        <div class="badge">${reactionType}</div>
        <div class="badge">Balanced ✓</div>
    `;
    
    visualizeMolecule(productMolecules[0]);
}

function determineReactionType(reactants, products) {
    if (reactants.includes('O2')) return 'Combustion';
    if (products.split('+').length > reactants.split('+').length) return 'Decomposition';
    if (reactants.split('+').length > products.split('+').length) return 'Synthesis';
    return 'Chemical Reaction';
}

function visualizeMolecule(moleculeStr) {
    if (!scene2 || !camera2 || !renderer2 || !moleculeGroup) {
        console.error('Molecule viewer not initialized');
        return;
    }

    // Clear previous molecule
    while (moleculeGroup.children.length > 0) {
        const obj = moleculeGroup.children[0];
        moleculeGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
    }

    const formula = moleculeStr.replace(/^\d+/, '').trim();
    const atoms = parseChemicalFormula(formula);

    const atomColors = {
        'H': 0xffffff,
        'C': 0x333333,
        'O': 0xff0000,
        'N': 0x0000ff,
        'S': 0xffff00,
        'Cl': 0x00ff00,
        'F': 0x90e050,
        'P': 0xff8000
    };

    const atomPositions = [];
    const radius = 5;
    let index = 0;
    const totalMolecules = Object.values(atoms).reduce((a, b) => a + b, 0);

    for (const [element, count] of Object.entries(atoms)) {
        for (let i = 0; i < count; i++) {
            const geometry = new THREE.SphereGeometry(0.8, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: atomColors[element] || 0xcccccc,
                emissive: atomColors[element] || 0xcccccc,
                emissiveIntensity: 0.3
            });
            const sphere = new THREE.Mesh(geometry, material);

            const angle = (index / totalMolecules) * Math.PI * 2;
            const position = new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                (Math.random() - 0.5) * 2
            );
            
            sphere.position.copy(position);
            moleculeGroup.add(sphere);
            atomPositions.push({ mesh: sphere, position: position });

            if (index > 0) {
                const prevPos = atomPositions[index - 1].position;
                const distance = position.distanceTo(prevPos);
                
                const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, distance, 8);
                const bondMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
                const bond = new THREE.Mesh(bondGeometry, bondMaterial);

                const midpoint = new THREE.Vector3().addVectors(position, prevPos).multiplyScalar(0.5);
                bond.position.copy(midpoint);
                
                const direction = new THREE.Vector3().subVectors(prevPos, position);
                bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

                moleculeGroup.add(bond);
            }

            index++;
        }
    }

    // Update molecule info
    const moleculeInfo = document.getElementById('moleculeInfo');
    if (moleculeInfo) {
        moleculeInfo.innerHTML = `
            <div style="font-size: 1.1em; font-weight: bold; margin-bottom: 8px;">${formula}</div>
            <div style="font-size: 0.9em; opacity: 0.9;">Total molecules: ${totalMolecules}</div>
            <div style="font-size: 0.85em; opacity: 0.8; margin-top: 5px;">🖱️ Drag to rotate</div>
        `;
    }

    renderer2.render(scene2, camera2);
}

function setupDragAndDrop() {
    const particleIcons = document.querySelectorAll('.particle-icon');
    const dropZone = document.getElementById('viewer3D');
    const dropZoneHighlight = document.getElementById('dropZone');
    
    if (!dropZone || !dropZoneHighlight) {
        console.error('Drop zone elements not found');
        return;
    }
    
    particleIcons.forEach(icon => {
        icon.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('text/plain', e.target.dataset.particle);
            icon.style.opacity = '0.5';
        });
        
        icon.addEventListener('dragend', (e) => {
            icon.style.opacity = '1';
        });
    });
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        dropZoneHighlight.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', (e) => {
        dropZoneHighlight.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZoneHighlight.classList.remove('drag-over');
        const particleType = e.dataTransfer.getData('text/plain');
        if (particleType) {
            addParticle(particleType);
        }
    });
    
    dropZone.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        removeLastParticle();
    });
}

function removeLastParticle() {
    if (electrons > 0) {
        removeParticle('electron');
    } else if (neutrons > 0) {
        removeParticle('neutron');
    } else if (protons > 0) {
        removeParticle('proton');
    }
}

function setupMouseControls() {
    const container = document.getElementById('viewer3D');
    const container2 = document.getElementById('viewer3D2');
    
    if (!container || !container2) {
        console.error('Viewer containers not found');
        return;
    }
    
    // Mouse controls for atom viewer
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        autoRotate = false;
        lastInteractionTime = Date.now();
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mousemove', (e) => {
        if (isDragging && nucleusGroup && electronGroup) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;
            
            const rotationSpeed = 0.005;
            
            nucleusGroup.rotation.y += deltaX * rotationSpeed;
            nucleusGroup.rotation.x += deltaY * rotationSpeed;
            electronGroup.rotation.y += deltaX * rotationSpeed;
            electronGroup.rotation.x += deltaY * rotationSpeed;
            
            rotationVelocity.y = deltaX * rotationSpeed * 0.1;
            rotationVelocity.x = deltaY * rotationSpeed * 0.1;
            
            previousMousePosition = { x: e.clientX, y: e.clientY };
            lastInteractionTime = Date.now();
        }
    });

    // Mouse controls for molecule viewer
    let isDragging2 = false;
    let previousMousePosition2 = { x: 0, y: 0 };
    
    container2.addEventListener('mousedown', (e) => {
        isDragging2 = true;
        previousMousePosition2 = { x: e.clientX, y: e.clientY };
    });

    container2.addEventListener('mousemove', (e) => {
        if (isDragging2 && moleculeGroup) {
            const deltaX = e.clientX - previousMousePosition2.x;
            const deltaY = e.clientY - previousMousePosition2.y;
            
            const rotationSpeed = 0.005;
            
            moleculeGroup.rotation.y += deltaX * rotationSpeed;
            moleculeGroup.rotation.x += deltaY * rotationSpeed;
            
            previousMousePosition2 = { x: e.clientX, y: e.clientY };
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        isDragging2 = false;
        lastInteractionTime = Date.now();
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        autoRotate = false;
        lastInteractionTime = Date.now();
        const touch = e.touches[0];
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
        e.preventDefault();
    });

    container.addEventListener('touchmove', (e) => {
        if (isDragging && nucleusGroup && electronGroup) {
            const touch = e.touches[0];
            const deltaX = touch.clientX - previousMousePosition.x;
            const deltaY = touch.clientY - previousMousePosition.y;
            
            const rotationSpeed = 0.005;
            
            nucleusGroup.rotation.y += deltaX * rotationSpeed;
            nucleusGroup.rotation.x += deltaY * rotationSpeed;
            electronGroup.rotation.y += deltaX * rotationSpeed;
            electronGroup.rotation.x += deltaY * rotationSpeed;
            
            rotationVelocity.y = deltaX * rotationSpeed * 0.1;
            rotationVelocity.x = deltaY * rotationSpeed * 0.1;
            
            previousMousePosition = { x: touch.clientX, y: touch.clientY };
            lastInteractionTime = Date.now();
            e.preventDefault();
        }
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
        lastInteractionTime = Date.now();
    });

    container.addEventListener('dblclick', () => {
        autoRotate = !autoRotate;
        lastInteractionTime = Date.now();
    });
}

function createDefaultAtom() {
    // Create a Carbon atom (6 protons, 6 neutrons, 6 electrons)
    for (let i = 0; i < 6; i++) {
        addParticle('proton');
    }
    for (let i = 0; i < 6; i++) {
        addParticle('neutron');
    }
    for (let i = 0; i < 6; i++) {
        addParticle('electron');
    }
}

function createDefaultMolecule() {
    // Create a water molecule (H2O) by default
    const defaultEquation = '2H2 + O2 = 2H2O';
    document.getElementById('equationInput').value = defaultEquation;
    calculateEquation();
}

function buildAtomFromInput() {
    const input = elementInput.value.trim();
    if (!input) return;

    let elementData = null;

    if (!isNaN(input)) {
        const atomicNumber = parseInt(input);
        elementData = elements[atomicNumber];
    } else {
        elementData = Object.values(elements).find(el => 
            el.symbol.toLowerCase() === input.toLowerCase() || 
            el.name.toLowerCase() === input.toLowerCase()  
        ) || { symbol: '?', name: 'Unknown', weight: 0 };
    }

    resetAtom();

    const atomicNum = Object.keys(elements).find(key => elements[key] === elementData);
    const protons = parseInt(atomicNum);
    const neutrons = Math.round(elementData.weight - protons);
    const electrons = protons;

    for (let i = 0; i < protons; i++) addParticle('proton');
    for (let i = 0; i < neutrons; i++) addParticle('neutron');
    for (let i = 0; i < electrons; i++) addParticle('electron');

    document.getElementById('ElementInput').value = '';
}

function keyPressLesson() {
    document.addEventListener('keydown', (e) => {
        if (overlay.style.display === 'block' && e.key === 'Enter') {
            const lessonTitle = document.getElementById('lessonTitle').textContent.toLowerCase();
            if (['atoms', 'protons', 'electrons', 'neutrons', 'charge'].some(l => lessonTitle.includes(l))) {
                switchTab('build'); 
                overlay.style.display = 'none'; 
            } else if (lessonTitle.includes('equation')) {
                switchTab('equation');
                overlay.style.display = 'none';
            }
        }
    });
}

keyPressLesson();

function sidebarCollapse(load) {
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    if (load === 'load') {
        sidebar.classList.toggle('expanded');
    }

    toggleBtn.addEventListener('mouseenter', () => {
        if (overlay.style.display === 'block' || overlay.style.display === '') {
            overlay.style.display = 'none';
        }  
        sidebar.classList.toggle('expanded');
    });
}


window.addEventListener('load', () => {
    initThreeJS();
    sidebarCollapse('load');
    updateDisplay();
    setupMouseControls();
    setupDragAndDrop();
    switchTab('build');

    setTimeout(() => {
        createDefaultAtom();
        createDefaultMolecule();
    }, 100);
});

window.addEventListener('resize', () => {
    const containerAtom = document.getElementById('viewer3D');
    if (containerAtom && camera && renderer) {
        camera.aspect = containerAtom.clientWidth / containerAtom.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerAtom.clientWidth, containerAtom.clientHeight);
    }

    const containerMolecule = document.getElementById('viewer3D2');
    if (containerMolecule && camera2 && renderer2) {
        camera2.aspect = containerMolecule.clientWidth / containerMolecule.clientHeight;
        camera2.updateProjectionMatrix();
        renderer2.setSize(containerMolecule.clientWidth, containerMolecule.clientHeight);
    }
});

overlay.classList.add('lesson-overlay');
overlay.innerHTML = `
    <h2 id="lessonTitle">Lesson Title <span class="rotating-icon"></span></h2>
    <div id="lessonContent">
        <p>Lesson content will be displayed here.</p>
    </div>
`;
document.body.appendChild(overlay);

document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('mouseenter', e => {
        e.preventDefault();
        overlay.style.display = 'block';
        const lessonId = link.getAttribute('href').substring(1);
        const title = link.textContent;
        document.getElementById('lessonTitle').textContent = title;

        let content = '';
        switch (lessonId) {
            case 'atoms':
                content = ` <p>
                            - are the basic particles of the chemical elements and the fundamental building blocks of matter. 
                            An atom consists of a nucleus of protons and generally neutrons, surrounded by an electromagnetically bound swarm of electrons. 
                            The chemical elements are distinguished from each other by the number of protons that are in their atoms. For example, any atom 
                            that contains 11 protons is sodium, and any atom that contains 29 protons is copper.
                            Atoms with the same number of protons but a different number of neutrons are called isotopes of the same element.
                            </p>

                            <div>
                                <img 
                                    src="../assets/example.jpg"
                                    alt="Atom Diagram"
                                >
                            </div>
                            
                            <p>
                            - are extremely small, typically around 100 picometers across. 
                            A human hair is about a million carbon atoms wide. Atoms are smaller than the shortest wavelength of visible light, 
                            which means humans cannot see atoms with conventional microscopes. They are so small that accurately predicting their behavior using classical physics is not possible due to quantum effects.
                            <span style="color: red;">PRESS ENTER TO PROCEED TO SIMULATION</span>
                            </p>
                            `;

                switchTab('build')
                break;
            case 'protons':
                content = ` <p> is a stable subatomic particle, symbol p, H+, or 1H+ with a positive electric charge of +1 e (elementary charge). 
                            Its mass is slightly less than the mass of a neutron and approximately 1836 times the mass of an electron (the proton-to-electron mass ratio). 
                            Protons and neutrons, each with a mass of approximately one dalton, are jointly referred to as nucleons (particles present in atomic nuclei).
                            </p>

                            <div>
                                <img 
                                    src="../assets/protons.jpeg"
                                    alt="Atom Diagram"
                                >
                            </div>
                            
                            <p>
                                One or more protons are present in the nucleus of every atom. 
                                They provide the attractive electrostatic central force which binds the atomic electrons. 
                                The number of protons in the nucleus is the defining property of an element, and is referred 
                                to as the atomic number (represented by the symbol Z). Since each element is identified by 
                                the number of protons in its nucleus, each element has its own atomic number, which determines 
                                the number of atomic electrons and consequently the chemical characteristics of the element.

                                The word proton is Greek for "first", and the name was given to the hydrogen nucleus by Ernest
                                Rutherford in 1920. In previous years, Rutherford had discovered that the hydrogen nucleus 
                                (known to be the lightest nucleus) could be extracted from the nuclei of nitrogen by atomic 
                                collisions.[10] Protons were therefore a candidate to be a fundamental or elementary particle, 
                                and hence a building block of nitrogen and all other heavier atomic nuclei.
                                <span style="color: red;">PRESS ENTER TO PROCEED TO SIMULATION</span>
                            </p>
                            `;

                switchTab('build')
                break;
            case 'electrons':
                content = ` <p> 
                            is a subatomic particle whose electric charge is negative one elementary 
                            charge. It is an elementary particle that comprises the ordinary matter that makes up the universe, along with up and down quarks.
                            </p>

                            <div>
                                <img 
                                    src="../assets/electrons.jpg"
                                    alt="Atom Diagram"
                                >
                            </div>
                            
                            <p> 
                            Electrons are extremely lightweight particles. In atoms, an electron's
                            matter wave occupies atomic orbitals around a positively charged atomic
                            nucleus. The configuration and energy levels of an atom's electrons 
                            determine the atom's chemical properties.
                            <span style="color: red;">PRESS ENTER TO PROCEED TO SIMULATION</span>
                            </p>
                            `;

                switchTab('build')
                break;
            case 'neutrons':
                content = ` <p> 
                            is a subatomic particle, symbol n or n0
                            , that has no electric charge, and a mass slightly greater than that of a proton. The neutron was discovered by James Chadwick in 1932, 
                            leading to the discovery of nuclear fission in 1938, the first self-sustaining nuclear reactor 
                            (Chicago Pile-1, 1942), and the first nuclear weapon (Trinity, 1945).
                            </p>

                            <div>
                                <img 
                                    src="../assets/neutrons.jpg"
                                    alt="Atom Diagram"
                                >
                            </div>

                            <p>
                            Neutrons are found, together with a similar number of protons in the nuclei of atoms. 
                            Atoms of a chemical element that differ only in neutron number are called isotopes. 
                            Free neutrons are produced copiously in nuclear fission and fusion. 
                            They are a primary contributor to the nucleosynthesis of chemical elements within stars through 
                            fission, fusion, and neutron capture processes. 
                            <span style="color: red;">PRESS ENTER TO PROCEED TO SIMULATION</span>
                            </p>
                            `;

                switchTab('build')
                break;
            case 'charge':
                content = ` <p>
                                Properties of Charge
                            </p>

                            <div>
                                <img 
                                    src="../assets/charge.jpg"
                                    alt="Atom Diagram"
                                >
                            </div>

                            <p>
                                A net flow of charge in a particular direction is called an electric current. Charges move in an electric potential field. In everyday terms, this means a voltage can produce a current.

                                Conductors are materials that charge can flow through. Materials that charge cannot flow through, or the flow is negligible, are termed insulators.

                                Current, symbol I, measures the rate that charge moves past any chosen point; it has units of coulombs per second, C s-1. The coulomb per second is usually called the amp or ampere, symbol A.

                                The movement of charge can result in energy losses - see electrical resistance and impedance - or no losses - see superconductivity. <span style="color: red;">PRESS ENTER TO PROCEED TO SIMULATION</span>
                            </p>

                            `;
                switchTab('build')
                break;
            case 'Elements':
                content = ` <p>
                            The periodic table organizes all known chemical elements based on their 
                            atomic number, electron configurations, and recurring chemical properties, 
                            providing a systematic way to understand their behavior.
                            Overview of the Periodic Table
                            The periodic table is a tabular arrangement of the chemical elements, 
                            organized by increasing atomic number, which is the number of protons in
                            an atom's nucleus. The elements are displayed in rows called periods and 
                            columns known as groups. Elements in the same group share similar
                            chemical properties due to their similar valence electron configurations. 
                            <span style="color: red;">PRESS ENTER TO PROCEED TO SIMULATION</span>
                            </p>

                            <div>
                                <img 
                                    src="../assets/elements.png"
                                    alt="Atom Diagram"
                                >
                            </div>

                            `;
                break;
            case 'balance-equation':
                content = `<p>Balancing chemical equations involves ensuring that the number of atoms for each element is the same on both sides of the equation, adhering to the law of conservation of mass.
                            Steps to Balance a Chemical Equation
                            Write the Unbalanced Equation: Start with the unbalanced equation, which shows the reactants and products. For example, consider the combustion of propane:
                            C
                            3
                            H
                            8
                            +
                            O
                            2
                            →
                            C
                            O
                            2
                            +
                            H
                            2
                            O
                            C 
                            3
                            ​
                            H 
                            8
                            ​
                            +O 
                            2
                            ​
                            →CO 
                            2
                            ​
                            +H 
                            2
                            ​
                            O
                            Count the Atoms: Count the number of atoms of each element on both sides of the equation. For the example above, you would count the carbon (C), hydrogen (H), and oxygen (O) atoms on both sides.
                            Balance One Element at a Time:
                            Start with the element that appears in the least number of compounds. In the example, balance the carbon atoms first. Since there are 3 carbon atoms in propane, you would need 3 CO₂ on the product side:
                            C
                            3
                            H
                            8
                            +
                            O
                            2
                            →
                            3
                            C
                            O
                            2
                            +
                            H
                            2
                            O
                            C 
                            3
                            ​
                            H 
                            8
                            ​
                            +O 
                            2
                            ​
                            →3CO 
                            2
                            ​
                            +H 
                            2
                            ​
                            O
                            Continue Balancing Other Elements: Next, balance the hydrogen atoms. There are 8 hydrogen atoms in propane, so you need 4 H₂O on the product side:
                            C
                            3
                            H
                            8
                            +
                            O
                            2
                            →
                            3
                            C
                            O
                            2
                            +
                            4
                            H
                            2
                            O
                            C 
                            3
                            ​
                            H 
                            8
                            ​
                            +O 
                            2
                            ​
                            →3CO 
                            2
                            ​
                            +4H 
                            2
                            ​
                            O
                            Balance Oxygen Last: Finally, balance the oxygen atoms. Count the total oxygen atoms on the product side (3 CO₂ contributes 6 O and 4 H₂O contributes 4 O, totaling 10 O). You will need 5 O₂ on the reactant side:
                            C
                            3
                            H
                            8
                            +
                            5
                            O
                            2
                            →
                            3
                            C
                            O
                            2
                            +
                            4
                            H
                            2
                            O
                            C 
                            3
                            ​
                            H 
                            8
                            ​
                            +5O 
                            2
                            ​
                            →3CO 
                            2
                            ​
                            +4H 
                            2
                            ​
                            O
                            Check Your Work: Ensure that the number of atoms for each element is the same on both sides of the equation. In this case, you have 3 C, 8 H, and 10 O on both sides. <span style="color: red;">PRESS ENTER TO PROCEED TO SIMULATION</span>
                            </p> 
                            <div>
                                <img 
                                    src="../assets/BE.jpg"
                                    alt="Atom Diagram"
                                    style="width: 500px"
                                >
                            </div>
                            `;
                                            switchTab('equation')
                break;
            case 'molecules':
                content = `
                            <p>In chemistry, a molecule is defined as a group of two or more atoms bonded together, forming 
                            the smallest identifiable unit of a pure substance that retains its chemical properties and composition. 
                            Molecules are held together by chemical bonds, such as covalent bonds, where atoms share electrons. The structure of a 
                            molecule, including the arrangement of its atoms and the types of bonds, determines its chemical properties. Molecules can 
                            vary in size from simple diatomic molecules like hydrogen (H₂) to complex macromolecules like proteins and nucleic acids.
                            </p>

                            <img 
                                    src="../assets/molecules.jpg"
                                    alt="Atom Diagram"
                                    style="width: 500px"
                                >

                            <p>The division of a sample of a substance into progressively smaller parts produces no change in either its
                             composition or its chemical properties until parts consisting of single molecules are reached. Further 
                             subdivision of the substance leads to still smaller parts that usually differ from the original substance in
                              composition and always differ from it in chemical properties. In this latter stage of fragmentation the chemical
                               bonds that hold the atoms together in the molecule are broken. <span style="color: red;">PRESS ENTER TO PROCEED
                                TO SIMULATION</span></p>
                            `;
                switchTab('equation')
                break;
            default:
                content = '<p>Content not found.</p>';
                switchTab('build')
        }

        document.getElementById('lessonContent').innerHTML = content;

        overlay.classList.add('show');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            overlay.classList.remove('show')
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const atomTitle = document.getElementById('lessonTitle');
    const atomContent = document.getElementById('lessonContent');

    if (atomTitle && atomContent) {
        atomTitle.textContent = 'Atoms';
        atomContent.innerHTML = 
        `
            <p>
            - are the basic particles of the chemical elements and the fundamental building blocks of matter. 
            An atom consists of a nucleus of protons and generally neutrons, surrounded by an electromagnetically bound swarm of electrons. 
            The chemical elements are distinguished from each other by the number of protons that are in their atoms. For example, any atom 
            that contains 11 protons is sodium, and any atom that contains 29 protons is copper.
            Atoms with the same number of protons but a different number of neutrons are called isotopes of the same element.
            </p>

            <div>
                <img 
                    src="../assets/example.jpg"
                    alt="Atom Diagram"
                >
            </div>
            
            <p>
            - are extremely small, typically around 100 picometers across. 
            A human hair is about a million carbon atoms wide. Atoms are smaller than the shortest wavelength of visible light, 
            which means humans cannot see atoms with conventional microscopes. They are so small that accurately predicting their behavior using classical physics is not possible due to quantum effects.
            <span style="color: red;">PRESS ENTER TO PROCEED TO SIMULATION</span>
            </p>

        `;

        overlay.classList.add('show');
    }
});