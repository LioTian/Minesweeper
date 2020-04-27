Page({
    data: {},
    bindViewTap: function (e) {
        wx.navigateTo({
            url: "../game/game?type=" + e.target.dataset.type,
        });
    },
});
