"use strict";

const price = document.getElementById("price");
const result = document.getElementById("result");
const status = document.getElementById("rate-status");
const form = document.getElementById("converter");
const refresh = form.querySelector("button");
const reverseForm = document.getElementById("reverse-converter");
const reversePrice = document.getElementById("reverse-price");
const reverseResult = document.getElementById("reverse-result");
const reverseButton = reverseForm.querySelector("button");
const litersPerUSGallon = 3.785411784;
let exchangeRate = null;
let rateDate = "";

function convert() {
    const amount = price.valueAsNumber;
    if (!price.validity.valid || !Number.isFinite(amount) || amount < 0) {
        result.value = "—";
        return;
    }
    if (exchangeRate === null) {
        result.value = "—";
        return;
    }
    const converted = amount * exchangeRate / litersPerUSGallon;
    result.value = Number.isFinite(converted)
        ? converted.toFixed(3)
        : "Price is too large";
}

function convertReverse() {
    const amount = reversePrice.valueAsNumber;
    if (exchangeRate === null || !reversePrice.validity.valid ||
        !Number.isFinite(amount) || amount < 0) {
        reverseResult.value = "—";
        return;
    }
    const converted = amount / exchangeRate * litersPerUSGallon;
    reverseResult.value = Number.isFinite(converted)
        ? converted.toFixed(3)
        : "Price is too large";
}

async function loadRate() {
    refresh.disabled = true;
    reverseButton.disabled = true;
    status.textContent = "Loading USD to CAD exchange rate...";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
        const response = await fetch("https://api.frankfurter.dev/v2/rate/USD/CAD", {
            signal: controller.signal,
            credentials: "omit"
        });
        if (!response.ok) throw new Error("Exchange rate request failed");
        const data = await response.json();
        if (data.base !== "USD" || data.quote !== "CAD" ||
            typeof data.rate !== "number" || !Number.isFinite(data.rate) || data.rate <= 0 ||
            typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
            throw new Error("Invalid exchange rate response");
        }
        exchangeRate = data.rate;
        rateDate = data.date;
        status.textContent = "1 USD = " + exchangeRate + " CAD. Rate date: " + rateDate + ".";
        convert();
        convertReverse();
    } catch (error) {
        if (exchangeRate === null) {
            result.value = "—";
            reverseResult.value = "—";
            status.textContent = "Could not load the exchange rate. Press Convert to retry.";
        } else {
            status.textContent = "Could not refresh. Still using 1 USD = " + exchangeRate +
                " CAD from " + rateDate + ".";
        }
    } finally {
        clearTimeout(timeout);
        refresh.disabled = false;
        reverseButton.disabled = false;
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (exchangeRate === null) loadRate();
    else convert();
});
price.addEventListener("input", convert);
reverseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (exchangeRate === null) loadRate();
    else convertReverse();
});
reversePrice.addEventListener("input", convertReverse);
loadRate();
