'use strict';
// window.localStorage.clear();
// Grab DOM elements
const bulletHeader = document.querySelector('#txt-bullet-header');
const bulletSerialNum = document.querySelector('#txt-bullet-serial-num');
const bulletSyncDirective = document.querySelector('#txt-bullet-sync-directive');

function eraseBillboard () {
 // Clear previous displayed messages
 bulletHeader.textContent = '';
 bulletSerialNum.textContent = '';
 bulletSyncDirective.textContent = '';
}

function reportHardwareStatus () {
eraseBillboard();
 // Provide serialization Status
 bulletHeader.textContent = 'Hardware Serialization Status:';
 const serializationStatus=fetchSerialNumFromLocSto();
console.log('serializationStatus: ', {serializationStatus} );
bulletSerialNum.style.color='red';
 if (serializationStatus===null) {
bulletSerialNum.textContent='null'; }else if (serializationStatus==='') {
bulletSerialNum.textContent='erased';
 }else if (serializationStatus===undefined) {
bulletSerialNum.textContent='unformatted';
 } else {
bulletSerialNum.style.color='lightgreen';
 bulletSerialNum.textContent=`Serial Number found: ${serializationStatus}`;
 }
  // Provide Sync Directive 
 const syncDirectiveStatus=getPairDirectiveFromLocSto();
console.log('syncDirectiveStatus: ', {syncDirectiveStatus} );
 if (syncDirectiveStatus===null) {
bulletSyncDirective.textContent=`Pair Directive value: null`;
 }else if (syncDirectiveStatus==='') {
bulletSyncDirective.textContent=`Pair Sync Directive value: erased`;
 }else if (syncDirectiveStatus===undefined) {
bulletSyncDirective.textContent=`Pair Sync Directive value: unformatted`;
 } else {
bulletSyncDirective.textContent=`Sync Directive value: ${syncDirectiveStatus}`;
}
}

window.onload = function () {
reportHardwareStatus();
};
/*
THIS SCRIPT "BURNS" A MASTER KEY TO LOCALSTORAGE AND SETS THE FIRST RUN FLAG TO "TRUE".
*/
/*###################################*/

// Grab form's Serial Number Input Box
const serialNumInputBox = document.querySelector('#master-key');
// Auxiliary functions
function saveSerialNumToLocSto () {
 window.localStorage.setItem('hardwareSerialNum', JSON.stringify(serialNumInputBox.value));
}

function fetchSerialNumFromLocSto () {
 const hardwareSerialNum = JSON.parse(window.localStorage.getItem('hardwareSerialNum'));
 return hardwareSerialNum;
}

function getPairDirectiveFromLocSto () {
 const pairScriptToPC = JSON.parse(window.localStorage.getItem('pairScriptToPC'));
 return pairScriptToPC;
}

function savePairDirectiveToLocSto (booleanValue) {
 window.localStorage.setItem('pairScriptToPC', JSON.stringify(booleanValue));
}

// Provide visual confirmation of serialization
function reportSerializationOutcome () {
 // Clear previously displayed bullets
 eraseBillboard();

 bulletHeader.textContent = 'Serial Number set to:';
 const hardwareSerialNum = fetchSerialNumFromLocSto();
  bulletSerialNum.textContent = hardwareSerialNum;
 
 const pairScriptToPC = getPairDirectiveFromLocSto();
 bulletSyncDirective.innerText = `Pair Directive set to: ${pairScriptToPC}`;
}

// Establish a Hardware Serial Number on the PC HDD (localStorage)
function markPCwithHWSerialNum () {
 if (serialNumInputBox.value==='') {
 bulletSerialNum.style. color = 'red';
  bulletSerialNum.textContent = `Error! Serial Number required. Try again.`;
return;
 }else{
   // Set the Pairing Directive
 saveSerialNumToLocSto();
bulletSerialNum.style.color = 'lightgreen';
 const enablePairing=true;
 savePairDirectiveToLocSto (enablePairing);
 }
 // Clear form input field
 serialNumInputBox.value = '';
 // Tell user what was done
 reportSerializationOutcome();
}
// Event listener for serialization
const serializeBtn = document.querySelector('#serialize-btn');
serializeBtn.addEventListener('click', markPCwithHWSerialNum);

/*###################################*/
// Provide visual confirmation of Serial Number deletion
function reportDeserializationOutcome () {
 // Clear previous displayed messages
 eraseBillboard();
 // Provide visual confirmation of operations success
 bulletHeader.textContent = 'De-serialization outcome:';
 // Retrieved serial number after erasure
 const hardwareSerialNum=fetchSerialNumFromLocSto();
 
 if (hardwareSerialNum ==='') {
  bulletSerialNum.style.color = 'lightgreen';
  bulletSerialNum.textContent = 'Serial Number Deleted';
 } else {
  bulletSerialNum.style.color = 'red';
  bulletSerialNum.textContent = 'Erasure Failed';
 }
 const directiveStatus = getPairDirectiveFromLocSto();
 bulletSyncDirective.innerText = `Pair Sync Directive value: ${directiveStatus}`;
}
// Erase the Hardware Serial Number from PC HDD
function erasePC_HWSerialNum () {
 window.localStorage.setItem('hardwareSerialNum', JSON.stringify(''));
 const disablePairing=false;
 savePairDirectiveToLocSto(disablePairing);
 reportDeserializationOutcome();
}
// Event listener for reportSerializationOutcome
const unserializeBtn = document.querySelector('#unserialize-btn');
unserializeBtn.addEventListener('click', erasePC_HWSerialNum);

/*###################################*/
/*
function toggleVisualFeedback () {
 // Clear previous displayed messages
 eraseBillboard();

 bulletHeader.textContent = 'Serial Number now:';
 const hardwareSerialNum = fetchSerialNumFromLocSto();

 if (hardwareSerialNum === '') {
  bulletSerialNum.style.color='red';
  bulletSerialNum.textContent=`No serial number.`;
 } else {
  bulletSerialNum.style.color = 'lightgreen';
  bulletSerialNum.textContent = hardwareSerialNum;
 }
 const pairScriptToPC = getPairDirectiveFromLocSto();
 
 bulletSyncDirective.innerText = `Pair Directive set to: ${pairScriptToPC}`;
}
*/

function toggleVisualFeedback () {
eraseBillboard();
 // Provide serialization Status
 bulletHeader.textContent = 'Serial Number after flag toggle:';
 const serializationStatus=fetchSerialNumFromLocSto();

bulletSerialNum.style.color='red';
 if (serializationStatus===null) {
bulletSerialNum.textContent='null'; }else if (serializationStatus==='') {
bulletSerialNum.textContent='erased';
 }else if (serializationStatus===undefined) {
bulletSerialNum.textContent='unformatted';
 } else {
bulletSerialNum.style.color='lightgreen';
 bulletSerialNum.textContent=`Serial Number still the same: ${serializationStatus}`;
 }
  // Provide Sync Directive 
 const syncDirectiveStatus=getPairDirectiveFromLocSto();

 if (syncDirectiveStatus===null) {
bulletSyncDirective.textContent=`Sync Directive remained as: null`;
 }else if (syncDirectiveStatus==='') {
bulletSyncDirective.textContent=`Sync Directive remained as: erased`;
 }else if (syncDirectiveStatus===undefined) {
bulletSyncDirective.textContent=`Sync Directive remained as: unformatted`;
 } else {
bulletSyncDirective.textContent=`Sync Directive toggled to: ${syncDirectiveStatus}`;
}
}

function toggleSyncFlag () {
 const pairScriptToPC =
 getPairDirectiveFromLocSto();
 if (pairScriptToPC === true) {
  const doNotSync = false;
  savePairDirectiveToLocSto(doNotSync);
 } else if (pairScriptToPC === false) {
  const synchronize = true;
  savePairDirectiveToLocSto(synchronize);
 }
 toggleVisualFeedback();
}
const toggleSyncBtn = document.querySelector('#toggle-sync-btn');
toggleSyncBtn.addEventListener ('click', toggleSyncFlag);

/*###################################*/
function whipeLocSto () {
window.localStorage.clear();
eraseBillboard();
reportHardwareStatus();
}

document.querySelector('#whipe-localstorage-btn').addEventListener('click',whipeLocSto);
