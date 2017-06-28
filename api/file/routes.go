package file

import (
	"github.com/labstack/echo"
)

func Init(r *echo.Echo)  {
	s := new(service)

	r.GET("/api/v1/datasets/", s.GetDatasets)
	r.POST("/api/v1/datasets/", s.SaveFileAsDataset)
}

//type registerIncidentRequest struct {
//	ID             cargo.TrackingID
//	Location       location.UNLocode
//	Voyage         voyage.Number
//	EventType      cargo.HandlingEventType
//	CompletionTime time.Time
//}
//
//type registerIncidentResponse struct {
//	Err error `json:"error,omitempty"`
//}
//
//func (r registerIncidentResponse) error() error { return r.Err }
//
//func makeRegisterIncidentEndpoint(hs Service) endpoint.Endpoint {
//	return func(ctx context.Context, request interface{}) (interface{}, error) {
//		req := request.(registerIncidentRequest)
//		err := hs.RegisterHandlingEvent(req.CompletionTime, req.ID, req.Voyage, req.Location, req.EventType)
//		return registerIncidentResponse{Err: err}, nil
//	}
//}
