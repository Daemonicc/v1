var mongoose = require('mongoose');
var Campground = require('./model/campground');
var Comment = require('./model/comment')

var data = [
    {
        name: 'Clody Mist',
        image: "https://ciannamichelleblog.files.wordpress.com/2014/05/140501065549-01-chibok-schoolgirls-restricted-horizontal-gallery.jpg?w=640&h=360&crop=1",
        description: 'Lorem ipsum dolor sit amet, id sea fuisset facilisi atomorum, ut qui nonumy accusata incorrupte. Vim ex enim conceptam. Et eam possim audire consequat, eu decore saperet pri. His ut essent dicunt noluisse, sit ei everti doctus docendi. Nec urbanitas theophrastus an, ut oratio ornatus prodesset vis. Cu primis vituperata usu, euismod efficiantur id duo. Id mea aliquid consequuntur. Eum esse oratio constituto eu, per et sumo brute molestie. No pri denique temporibus. Ad ferri vivendo senserit pro.'
    },
    {
        name: 'Msty Floor',
        image: 'https://ciannamichelleblog.files.wordpress.com/2014/05/140501065549-01-chibok-schoolgirls-restricted-horizontal-gallery.jpg?w=640&h=360&crop=1',
        description: 'Lorem ipsum dolor sit amet, id sea fuisset facilisi atomorum, ut qui nonumy accusata incorrupte. Vim ex enim conceptam. Et eam possim audire consequat, eu decore saperet pri. His ut essent dicunt noluisse, sit ei everti doctus docendi. Nec urbanitas theophrastus an, ut oratio ornatus prodesset vis. Cu primis vituperata usu, euismod efficiantur id duo. Id mea aliquid consequuntur. Eum esse oratio constituto eu, per et sumo brute molestie. No pri denique temporibus. Ad ferri vivendo senserit pro.'

    },
    {
        name: 'Floor slope',
        image: 'http://www.facts.ng/wp-content/uploads/2014/09/1997_274-24_Gerewol.jpg',
        description: 'Lorem ipsum dolor sit amet, id sea fuisset facilisi atomorum, ut qui nonumy accusata incorrupte. Vim ex enim conceptam. Et eam possim audire consequat, eu decore saperet pri. His ut essent dicunt noluisse, sit ei everti doctus docendi. Nec urbanitas theophrastus an, ut oratio ornatus prodesset vis. Cu primis vituperata usu, euismod efficiantur id duo. Id mea aliquid consequuntur. Eum esse oratio constituto eu, per et sumo brute molestie. No pri denique temporibus. Ad ferri vivendo senserit pro.'
    }
]
function seedDB(){
    Campground.remove({}, function(err){
        // if (err){
        //     console.log(err)
        // }else{
        //     console.log('Campgronuds removed succesfully');
        // }
        //     // add a few campground
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if (err){
        //             console.log(err)
        //         }else{
        //             console.log('add a campground')
        //             //add a  comment
        //             Comment.create(
        //                 {
        //                     text: 'This place is hell, please  donnt ever  come here',
        //                     author: 'Homer'
        //                 },  function(err, comment){
        //                     if (err){
        //                         console.log(err)
        //                     }else{
        //                         campground.comments.push(comment)
        //                         campground.save();
        //                         console.log('created new comment')
        //                     }
        //                 }
        //             )
        //         }
        //     })
        // })
    });

}
module.exports = seedDB;