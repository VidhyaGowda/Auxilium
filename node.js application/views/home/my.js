let global_latitude_basic;
let global_longitude_basic;


function initialize_render_map() {

    mapboxgl.accessToken = 'pk.eyJ1IjoibWFsdml5YXlhc2gxOCIsImEiOiJja2NyenVlOGgxandnMnJzNmV2eWE2NHFtIn0.VmwFLPWf4vvJVJ2fWyEJnQ';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-96, 37.8], // starting position
        zoom: 3 // starting zoom
    });

    // Initialize the geolocate control.
    var geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    });

    // Add the control to the map.
    map.addControl(geolocate);
    map.on('load', function () {
        geolocate.trigger();

    });

    marker = new mapboxgl.Marker({
        draggable: true
    })


    geolocate.on('geolocate', function (e) {
        global_longitude_basic = e.coords.longitude;
        global_latitude_basic = e.coords.latitude
        marker.setLngLat([global_longitude_basic, global_latitude_basic])
        marker.addTo(map);
    });



    function onDragEnd() {
        console.log('onDragEnd')
        var lngLat = marker.getLngLat();
        global_latitude_basic = lngLat.lat;
        global_longitude_basic = lngLat.lng;
        console.log(global_longitude_basic, global_latitude_basic);
    }

    marker.on('dragend', onDragEnd);


}

function collapse_remover() {
    $('#collapseTwo').removeClass('show');
    $('#collapseTwo1').removeClass('show');
    $('#collapseUtilities').removeClass('show');
}


let loading_spinner = '<div style="margin-top: 25%;" class="d-flex justify-content-center">' +
    '  <div style="width: 3rem; height: 3rem;" class="spinner-border text-primary" role="status">' +
    '    <span class="sr-only">Loading...</span>' +
    '  </div>' +
    '</div>';

let loading_spinner_small = '<div class="d-flex">' +
    '  <div style="width: 1.75rem; height: 1.75rem;" class="spinner-border text-primary" role="status">' +
    '    <span class="sr-only">Loading...</span>' +
    '  </div>' +
    '</div>';

function active_class_remover() {
    collapse_remover();
    $('#home_page').removeClass('active');
    $('#provide_services').removeClass('active');
    $('#post_new_services').removeClass('active');
    $('#recent_services').removeClass('active');
    $('#need_services').removeClass('active');
    $('#find_services').removeClass('active');
    $('#recent_services_taken').removeClass('active');
    $('#inbox').removeClass('active');
    $('#notification').removeClass('active');
    $('#make_changes').removeClass('active');
    $('#change_profile').removeClass('active');
    $('#change_contact').removeClass('active');

}

let global_posts;

$('#recent_services').click(function (event) {
    event.preventDefault();

    active_class_remover();

    $('#replacer').html(loading_spinner);
    $('#provide_services').addClass('active');
    $('#recent_services').addClass('active');

    $.ajax({
        global: false,
        type: 'GET',
        url: '/api/recent_services',
        dataType: 'html',
        success: function (result) {
            result = JSON.parse(result)
            posts = result.posts.posts;
            global_posts = posts;

            $('#replacer').html(result.data);
            let count = 1;

            if (posts.length != 0) {
                for (let i = 0; i < posts.length; i++) {

                    service = posts[i]['content']['service'];
                    description = posts[i]['content']['description'];
                    created_on = posts[i]['created_on'];
                    post_status = posts[i]['status'];



                    $("#dataTable > tbody").append('<tr>' +
                        '                    <td>' + count + '</td>' +
                        '                    <td>' + service + '</td>' +
                        '                    <td>' + description + '</td>' +
                        '                    <td>' + created_on + '</td>' +
                        '                    <td>' + post_status + '</td>' +
                        '                    <td><a onclick="edit_post_function(' + i + ')" type="button"> <img style="width:35px" src="https://img.icons8.com/cute-clipart/50/000000/edit.png"/> </a></td>' +
                        '                </tr>');
                    count = count + 1;
                }
            } else {
                $('.table-responsive').append('<div style="text-align: center;"> No posts found </div>');
            }

        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
});



function edit_post_function(i) {
    $('#body_table').css('display', 'none');
    $('#edit_post').css('display', 'block');
    $('#update_service').val(global_posts[i]['content']['service']);
    $('#update_description').val(global_posts[i]['content']['description']);
    $('#update_status').val(global_posts[i]['status']);
    $('#document_id').val(global_posts[i]['_id'])
}


function delete_initial() {
    console.log('Deleted button pressed');
    $('#confirmation_modal').modal('show');
}

function delete_final() {
    $('#confirmation_modal').modal('hide');
    $('#round_round_delete').html(loading_spinner_small);
    $.ajax({
        type: "post",
        url: "/api/delete_services",
        data: {
            'document_id': $('#document_id').val()
        },
        contentType: "application/x-www-form-urlencoded",
        success: function (responseData, textStatus, jqXHR) {
            //Ajax get all post request will come here
            $.ajax({
                global: false,
                type: 'GET',
                url: '/api/recent_services',
                dataType: 'html',
                success: function (result) {
                    result = JSON.parse(result)
                    posts = result.posts.posts;
                    global_posts = posts;

                    $('#replacer').html(result.data);
                    let count = 1;

                    if (posts.length != 0) {
                        for (let i = 0; i < posts.length; i++) {

                            service = posts[i]['content']['service'];
                            description = posts[i]['content']['description'];
                            created_on = posts[i]['created_on'];
                            post_status = posts[i]['status'];



                            $("#dataTable > tbody").append('<tr>' +
                                '                    <td>' + count + '</td>' +
                                '                    <td>' + service + '</td>' +
                                '                    <td>' + description + '</td>' +
                                '                    <td>' + created_on + '</td>' +
                                '                    <td>' + post_status + '</td>' +
                                '                    <td><a onclick="edit_post_function(' + i + ')" type="button"> <img style="width:35px" src="https://img.icons8.com/cute-clipart/50/000000/edit.png"/> </a></td>' +
                                '                </tr>');
                            count = count + 1;
                        }
                    } else {
                        $('.table-responsive').append('<div style="text-align: center;"> No posts found </div>');
                    }

                },
                error: function (request, status, error) {
                    console.log(error);
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}



function update_service(event) {
    if (global_latitude_final == null) {
        event.preventDefault();
        $('#location_modal').modal('show');
        initialize_render_map();
    } else {
        //post the form successfully
        event.preventDefault();
        $('#round_round').html(loading_spinner_small);
        $.ajax({
            type: "post",
            url: "/api/update_services",
            data: {
                'document_id': $('#document_id').val(),
                'service': $('#update_service').val(),
                'description': $('#update_description').val(),
                'latitude': global_latitude_final,
                'longitude': global_longitude_final,
                'status': $('#update_status').val()
            },
            contentType: "application/x-www-form-urlencoded",
            success: function (responseData, textStatus, jqXHR) {
                $('#round_round').html('<img style="width:40px" src="https://img.icons8.com/bubbles/50/000000/double-tick.png"/>');

                $.ajax({
                    global: false,
                    type: 'GET',
                    url: '/api/recent_services',
                    dataType: 'html',
                    success: function (result) {
                        $('#round_round').html('');
                        result = JSON.parse(result)
                        posts = result.posts.posts;
                        global_posts = posts;

                        $('#replacer').html(result.data);
                        let count = 1;

                        if (posts.length != 0) {
                            for (let i = 0; i < posts.length; i++) {

                                service = posts[i]['content']['service'];
                                description = posts[i]['content']['description'];
                                created_on = posts[i]['created_on'];
                                post_status = posts[i]['status'];



                                $("#dataTable > tbody").append('<tr>' +
                                    '                    <td>' + count + '</td>' +
                                    '                    <td>' + service + '</td>' +
                                    '                    <td>' + description + '</td>' +
                                    '                    <td>' + created_on + '</td>' +
                                    '                    <td>' + post_status + '</td>' +
                                    '                    <td><a onclick="edit_post_function(' + i + ')" type="button"> <img style="width:35px" src="https://img.icons8.com/cute-clipart/50/000000/edit.png"/> </a></td>' +
                                    '                </tr>');
                                count = count + 1;
                            }
                        } else {
                            $('.table-responsive').append('<div style="text-align: center;"> No posts found </div>');
                        }

                    },
                    error: function (request, status, error) {
                        console.log(error);
                    }
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }
}

function update_cancel() {
    $('#edit_post').css('display', 'none');
    $('#body_table').css('display', 'block');
}

$('#post_new_services').click(function (event) {
    event.preventDefault();

    active_class_remover();

    $('#replacer').html(loading_spinner);
    $('#provide_services').addClass('active');
    $('#post_new_services').addClass('active');

    $.ajax({
        global: false,
        type: 'GET',
        url: '/api/post_new_services',
        dataType: 'html',
        success: function (result) {
            result = JSON.parse(result)
            $('#replacer').html(result.data);
        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
});

function post_validation_location() {

    if (global_latitude_final == null) {
        event.preventDefault();
        $('#location_modal').modal('show');
        initialize_render_map();
    } else {
        //post the form successfully
        $('#round_round').html(loading_spinner_small);
        $.ajax({
            type: "post",
            url: "/api/post_new_services",
            data: {
                'service': $('#service').val(),
                'description': $('#description').val(),
                'latitude': global_latitude_final,
                'longitude': global_longitude_final
            },
            contentType: "application/x-www-form-urlencoded",
            success: function (responseData, textStatus, jqXHR) {
                $('#round_round').html('<img style="width:40px" src="https://img.icons8.com/bubbles/50/000000/double-tick.png"/>');
                $('#service').val('Medical');
                $('#description').val('');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }
}

let global_latitude_final;
let global_longitude_final;

function final_location() {
    if (global_longitude_basic == null) {

    } else {
        global_latitude_final = global_latitude_basic;
        global_longitude_final = global_longitude_basic;
        $('#location_modal').modal('hide');
    }
}

$('#find_services').click(function (event) {
    event.preventDefault();
    active_class_remover();
    $('#need_services').addClass('active');
    $('#find_services').addClass('active');
    $('#replacer').html(loading_spinner);

    $.ajax({
        global: false,
        type: 'GET',
        url: '/api/find_services',
        dataType: 'html',
        success: function (result) {
            result = JSON.parse(result)
            $('#replacer').html(result.data);
        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
})

$('#recent_services_taken').click(function (event) {
    event.preventDefault();
    active_class_remover();
    $('#need_services').addClass('active');
    $('#recent_services_taken').addClass('active');
    $('#replacer').html(loading_spinner);

    $.ajax({
        global: false,
        type: 'GET',
        url: '/api/recent_services_taken',
        dataType: 'html',
        success: function (result) {
            result = JSON.parse(result)
            $('#replacer').html(result.data);
        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
})

$('#home_page').click(function (event) {
    event.preventDefault();
    active_class_remover();
    $('#home_page').addClass('active');
    // $('#recent_services_taken').addClass('active');
    $('#replacer').html(loading_spinner);

    $.ajax({
        global: false,
        type: 'GET',
        url: '/api/about_us',
        dataType: 'html',
        success: function (result) {
            result = JSON.parse(result)
            $('#replacer').html(result.data);
        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
})

let global_search;

function search_results() {

    if (global_latitude_final == null) {
        // event.preventDefault();
        $('#location_modal').modal('show');
        initialize_render_map();
    } else {
        // event.preventDefault();
        $('#loader_icon').html(loading_spinner);
        $("#search_table > tbody").html("");
        $.ajax({
            global: false,
            type: 'POST',
            data: {
                'latitude': global_latitude_final,
                'longitude': global_longitude_final,
                'keyword': $('#search_result_input').val()
            },
            url: '/api/search',
            success: function (result) {
                $('#loader_icon').html('');
                // result = JSON.parse(result)
                // console.log(result);
                result = result.data.data;
                console.log(result);

                if (result === undefined) {
                    console.log('undefined')
                    $('#search_results').css("display", "block");
                    $('#no_result').css("display", "block");
                    $('#body_table').css("display", "none");
                } else {
                    $('#search_results').css("display", "block");
                    $('#no_result').css("display", "none");
                    $('#body_table').css("display", "block");
                    global_search = result
                    count = 1;
                    for (let i = 0; i < result.length; i++) {

                        service = result[i]['doc']['content']['service'];
                        description = result[i]['doc']['content']['description'];
                        created_on = result[i]['doc']['created_on'];
                        post_status = result[i]['doc']['status'];
                        distance = result[i]['doc']['distance'];
                        distance = Number(distance.toFixed(3));
                        if (distance < 0) {
                            distance = distance * 1000;
                            distance = distance + ' meters'
                        } else {
                            distance = distance + ' Km'
                        }


                        $("#search_table > tbody").append('<tr>' +
                            '                    <td>' + count + '</td>' +
                            '                    <td>' + service + '</td>' +
                            '                    <td>' + description + '</td>' +
                            '                    <td>' + created_on + '</td>' +
                            '                    <td>' + post_status + '</td>' +
                            '                    <td>' + distance + '</td>' +
                            '                    <td><button class="btn btn-primary" onclick="view_post_function(' + i + ')" type="button"> view service </button></td>' +
                            '                </tr>');
                        count = count + 1;
                    }

                }

            },
            error: function (request, status, error) {
                console.log(error);
            }
        });
    }
}


function view_post_function(id) {
    $('#service_provider_name').text('');
    $('#service_provider_contact').text('');
    $('#service_provider_service').text('');
    $('#service_provider_description').text('');
    $('#modal_body_round_round').html('');
    $('#view_service_modal').modal('show');
    let service_author = global_search[id]['doc']['user_id'];
    $('#modal_body_round_round').html(loading_spinner)
    $.ajax({
        global: false,
        type: 'POST',
        url: '/api/get_user',
        data: {
            "user_id": service_author
        },
        success: function (result) {
            // $('#map').html('');
            //call the map function here
            $('#service_provider_name').text(result.data.data.given_name + ' ' + result.data.data.family_name);
            $('#service_provider_contact').text(result.data.data.phone_number);
            $('#service_provider_service').text(global_search[id]['doc']['content']['service']);
            $('#service_provider_description').text(global_search[id]['doc']['content']['description']);
            $('#modal_body_round_round').html('<div style="position: initial;" id="post_map"></div >');
            call_post_map(global_search[id]['doc']['geometry']['coordinates'][1], global_search[id]['doc']['geometry']['coordinates'][0]);
        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
}

$('#change_profile').click(function (event) {
    event.preventDefault();
    active_class_remover();
    $('#make_changes').addClass('active');
    $('#change_profile').addClass('active');
    $('#replacer').html(loading_spinner);

    $.ajax({
        global: false,
        type: 'GET',
        url: '/api/change_profile',
        dataType: 'html',
        success: function (result) {
            result = JSON.parse(result)


            if (result.data.document_status == false) {
                $('#replacer').html(result.data);
                $('#first_name').val(result.user.given_name);
                $('#last_name').val(result.user.family_name);
            } else {
                // console.log(result)
                $('#replacer').html(result.data);
                $('#first_name').val(result.user_cloudant.given_name);
                $('#last_name').val(result.user_cloudant.family_name);
                $('#contact_number').val(result.user_cloudant.phone_number);
                // console.log('fetching the document');


            }

        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
})

function update_user_details() {
    $('#round_round_update').html(loading_spinner_small);
    event.preventDefault()
    $.ajax({
        global: false,
        type: 'POST',
        url: '/api/change_profile',
        data: {
            "given_name": $('#first_name').val(),
            "family_name": $('#last_name').val(),
            "phone_number": $('#contact_number').val()
        },
        success: function (result) {
            window.location.href = '/';

        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
}



function call_post_map(latitude, longitude) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFsdml5YXlhc2gxOCIsImEiOiJja2NyenVlOGgxandnMnJzNmV2eWE2NHFtIn0.VmwFLPWf4vvJVJ2fWyEJnQ';
    var map = new mapboxgl.Map({
        container: 'post_map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-96, 37.8], // starting position
        zoom: 3 // starting zoom
    });

    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    var marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);

    map.flyTo({
        zoom: 12,
        center: [longitude, latitude],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });

}

function on_window_load() {
    console.log('This should be called when the page body loads')
    active_class_remover();
    $('#home_page').addClass('active');
    // $('#recent_services_taken').addClass('active');
    $('#replacer').html(loading_spinner);

    $.ajax({
        global: false,
        type: 'GET',
        url: '/api/about_us',
        dataType: 'html',
        success: function (result) {
            result = JSON.parse(result)
            $('#replacer').html(result.data);
        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
}