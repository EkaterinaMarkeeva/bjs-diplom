"use strict"

const logoutButton = new LogoutButton();

logoutButton.action = function() {
	const callback = (serverResponse) => {
		if (serverResponse.success) {
			location.reload();
		} else {
			this.setLoginErrorMessage(serverResponse.error);
			throw serverResponse.error;
		}
	};
	ApiConnector.logout(callback);
};

const callback = (serverResponse) => {
	if (serverResponse.success) {
		ProfileWidget.showProfile(serverResponse.data);
	}
};

ApiConnector.current(callback);

const ratesBoard = new RatesBoard();
let intervalId;

function getСourse() {
	const callback = (serverResponse) => {
		if (serverResponse.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(serverResponse.data);
		}
	};

    ApiConnector.getStocks(callback);

    intervalId = setInterval(() => {
        ApiConnector.getStocks(callback);
	}, 60000);
};

getСourse();

const moneyManager = new MoneyManager();
const moneyManagerCallback = (serverResponse) => {
	if (serverResponse.success) {
		ProfileWidget.showProfile(serverResponse.data);
		this.setMessage(serverResponse.success, 'Операция выполнена успешно');
	} else {
		this.setMessage(!serverResponse.success, serverResponse.error);
	}
};

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, moneyManagerCallback);
};

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, moneyManagerCallback);
};

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, moneyManagerCallback)
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((serverResponse) => {
	if (serverResponse.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(serverResponse.data);
		moneyManager.updateUsersList(serverResponse.data);
	}
});

const favoritesWidgetCallback = (serverResponse) => {
	if (serverResponse.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(serverResponse.data);
		moneyManager.updateUsersList(serverResponse.data);
		favoritesWidget.setMessage(serverResponse.success, 'Операция выполнена успешно');
	} else {
		favoritesWidget.setMessage(!serverResponse.success, serverResponse.error);
	}
};

favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, favoritesWidgetCallback);
};

favoritesWidget.removeUserCallback = function(id) {
	ApiConnector.removeUserFromFavorites(id, favoritesWidgetCallback);
};