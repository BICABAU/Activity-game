

exports.ranking = function (req, res) {
    let top_ranking = new Gamification(null, req.session.user.curso)
    top_ranking.selectUsersByCourse()
     .then(function (usuarios_recuperados_ranking){
        res.render('pages/ranking', {usuarios_recuperados_ranking: usuarios_recuperados_ranking})        
     }).catch(function (err){
         res.send(err);
     })
};
